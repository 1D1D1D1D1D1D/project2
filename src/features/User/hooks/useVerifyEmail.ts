import { useMutation } from "@tanstack/react-query";
import { auth, handleAuthAction, handleCheckActionCode } from "shared/config/firebase/auth";
import { queryClient } from "shared/lib/queryClientPersister/queryClientPersister";



export const useVerifyEmail = () => {
    return useMutation({
        mutationFn: async (code: string) => {

            await handleCheckActionCode(code)
            'start handleAuthAction'
            return handleAuthAction("verifyEmail", code)

        },
    })
}

