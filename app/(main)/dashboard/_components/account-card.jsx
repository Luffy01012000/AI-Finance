"use client";

import { ArrowUpRight, ArrowDownRight, CreditCard, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { deleteAccount, updateDefaultAccount } from "@/actions/account";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function AccountCard({ account }) {
  const { name, type, balance, id, isDefault } = account;

  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id);
  };
  const {
    loading: deleteAccountLoading,
    fn: deleteAccountFn,
    data: deletedAccountData,
    error: deleteAccountError,
  } = useFetch(deleteAccount); 
  const handleDelete = async (id) => {
    await deleteAccountFn(id);
  }
  useEffect(() => {
    if (deletedAccountData?.success) {
      toast.success("Account seleted  successfully");
    }
  }, [deletedAccountData]);

  useEffect(() => {
    if (deleteAccountError) {
      toast.error(deleteAccountError.message || "Failed to update delete account");
    }
  }, [deleteAccountError]);

  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);

  return (
    <Card className="hover:shadow-md transition-shadow group relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
         <Link href={`/account/${id}`}> <CardTitle className="text-sm font-medium capitalize">
            {name}
          </CardTitle>
          </Link>
          <div className="flex items-center space-x-3">
          <Switch
            checked={isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultLoading}
          />
         {deleteAccountLoading? "Deleting...":(<Button variant={"ghost"} onClick={() => handleDelete(id)} ><Trash2 className="text-red-500" />
          </Button>)} 
          
          </div>
        </CardHeader>
        <Link href={`/account/${id}`}>
        <CardContent>
          <div className="text-2xl font-bold">
            ₹{parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
