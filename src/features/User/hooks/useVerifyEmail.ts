import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { handleAuthAction, handleCheckActionCode } from "shared/config/firebase/auth";
import { RoutePath } from "shared/config/route/routeConfig";



export const useVerifyEmail = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: async (code: string) => {
            const info = await handleCheckActionCode(code)
            return handleAuthAction("verifyEmail", code)
        },
        onSuccess: () => navigate(RoutePath.main),
        // onError: () => {
        //     return 'Code is expired or invalid'
        // }
    })
}

