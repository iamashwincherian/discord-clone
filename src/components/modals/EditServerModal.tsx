"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ApiClient from "@/lib/apiClient";
import useFixMount from "@/hooks/useFixMount";
import { useModal } from "@/hooks/useModalStore";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required!",
  }),
  imageUrl: z.string().optional(),
});

export default function EditServerModal() {
  const router = useRouter();
  const {
    isOpen,
    onClose,
    type,
    data: { server },
  } = useModal();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: server?.name || "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const isModalOpen = isOpen && type === "editServer";

  if (useFixMount()) return;
  if (!server) return;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await ApiClient.put(`/servers/${server.id}`, values);
    } finally {
      handleClose();
    }
  };

  const handleClose = () => {
    form.reset();
    router.refresh();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Edit server {server.name}
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Manage your own commiunity by editing this discord server
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                Upload server image later
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter Server Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant={"primary"} disabled={isLoading}>
                Edit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
