import { toast } from "sonner";
import { ActionStateType } from "./definitions";
import { redirect } from "next/navigation";

export function handleActionResponse(state: ActionStateType) {
  if (state.toast) {
    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }

  if (state.redirect.length > 0) {
    redirect(state.redirect);
  }
}