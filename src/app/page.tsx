import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Sidebar from "@/components/Sidebar";
import Bottombar from "@/components/Bottombar";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  recipient: z.string().min(1, "Recipient is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  currency: z.string().min(1, "Currency is required"),
  memo: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const SendPage = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
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

      const result = await response.json();

      if (response.ok && result.success) {
        toast({
          title: "Transaction Successful",
          description: `Transaction successful! ID: ${result.data.transaction_id}`,
          variant: "success",
        });
        formMethods.reset();
      } else {
        toast({
          title: "Transaction Failed",
          description: result.message || "An error occurred",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Transaction Failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row">
        {/* Sidebar for desktop */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Bottombar for mobile */}
        <div className="block md:hidden fixed bottom-0 w-full">
          <Bottombar />
        </div>

        <div className="flex flex-col items-center justify-center min-h-screen py-2 flex-1">
          <h1 className="text-2xl font-bold">Send Payment</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md mt-4"
          >
            <div className="mb-4">
              <Label htmlFor="recipient">Recipient</Label>
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
              <Label htmlFor="amount">Amount</Label>
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
              <Label htmlFor="currency">Currency</Label>
              <Select
                id="currency"
                defaultValue="BTC"
                {...register("currency")}
                className={`mt-1 ${errors.currency ? "border-red-500" : ""}`}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                </SelectContent>
              </Select>
              {errors.currency && (
                <p className="text-red-500 text-sm">{errors.currency.message}</p>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="memo">Memo</Label>
              <Textarea
                id="memo"
                {...register("memo")}
                className={`mt-1 ${errors.memo ? "border-red-500" : ""}`}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Processing..." : "Send Payment"}
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SendPage;
