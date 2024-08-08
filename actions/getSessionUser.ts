"use server";

import { getServerSession } from "next-auth";

export const getSessionUser = async () => {
    const session = await getServerSession();
    return session?.user;

}