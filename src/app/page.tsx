// create a default nextjs homepage for my crypto fintech payment app
// import dependencies
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSWRConfig } from "swr";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import dotenv from "dotenv";
import sidebar from "@/components/sidebar";
import bottombar from "@/components/bottombar";

dotenv.config();

// design the APP page 

const schema = z.object({
  recipient: z.string().min(1, "Recipient is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  currency: z.string().min(1, "Currency is required"),
  memo: z.string().optional(),
});

type FormData = z.infer<typeof schema>;
type SendPageProps = {
  params: {
    id: string;
  };
};
type SendPage = (props: SendPageProps) => JSX.Element;
const SendPage: SendPage = () => {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const formMethods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      recipient: "",
      amount: 0,
      currency: "BTC",
      memo: "",
    },
  });

  const { handleSubmit, register, formState: { errors } } = formMethods;

  const mutation = useMutation(
    async (data: FormData) => {
      // Send data to PhotonLancerr API
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          amount: parseFloat(data.amount.toString()),
          currency: data.currency,
          method: "crypto",
          description: data.memo || `Payment to ${data.recipient}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    {
      onSuccess: (data) => {
        if (data.success) {
          // Show success message
          toast({
            title: t("transaction_successful"),
            description: `Transaction successful! ID: ${data.data.transaction_id}`,
            variant: "success",
          });
          // Reset form
          formMethods.reset();
        } else {
          toast({
            title: t("transaction_failed"),
            description: data.message,
            variant: "destructive",
          });
        }
      },
      onError: (error) => {
        toast({
          title: t("transaction_failed"),
          description: error.message,
          variant: "destructive",
        });
      },
    }
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl font-bold">{t("send_payment
")}</h1>
        <form
          onSubmit={handleSubmit((data) => {
            setIsSubmitting(true);
            mutation.mutate(data);
          })}
          className="w-full max-w-md mt-4"
        >
          <div className="mb-4">
            <Label htmlFor="recipient">{t("recipient")}</Label>
            <Input
              id="recipient"
              type="text"
              {...register("recipient")}
              className={`mt-1 ${errors.recipient ? "border-red-500" : ""}`}
            />
            {errors.recipient && (
              <p className="text-red-500 text-sm">{errors.recipient.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="amount">{t("amount")}</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              {...register("amount")}
              className={`mt-1 ${errors.amount ? "border-red-500" : ""}`}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="currency">{t("currency")}</Label>
            <Select
              id="currency"
              defaultValue="BTC"
              {...register("currency")}
              className={`mt-1 ${errors.currency ? "border-red-500" : ""}`}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("select_currency")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                {/* Add more currencies as needed */}
              </SelectContent>
            </Select>
            {errors.currency && (
              <p className="text-red-500 text-sm">{errors.currency.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Label htmlFor="memo">{t("memo")}</Label>
            <Textarea
              id="memo"
              {...register("memo")}
              className={`mt-1 ${errors.memo ? "border-red-500" : ""}`}
            />
          </div>

          <Button type="submit" disabled={isSubmitting
            || mutation.isLoading} className="w-full">
            {isSubmitting || mutation.isLoading
              ? t("processing")
              : t("send_payment")}
          </Button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </div>

      <div className="fixed bottom-0 left-0 w-full">
        <bottombar />
      </div>
      <div className="fixed top-0 left-0 w-full">
        <sidebar />
      </div>
    </DashboardLayout>
  );
}

export default SendPage;

