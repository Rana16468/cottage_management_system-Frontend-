import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const {
    data: isAdmin = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      const res = await fetch(
        "https://creative-crafting.vercel.app/api/v1/isAdmin",
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      return data;
    },
    refetchInterval: 1000,
  });
  return {
    isAdmin,
    isLoading,
    error,
  };
};

export default useAdmin;
