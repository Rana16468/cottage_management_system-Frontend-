import { useQuery } from "@tanstack/react-query";
import React from "react";

const SellerReply = ({ detailsId }) => {
  const url = `http://localhost:3013/api/v1/display_specific_product_chat/${detailsId}`;
  const { data: sellerReplyMessage = [] } = useQuery({
    queryKey: ["chattingMessage", detailsId],
    queryFn: async () => {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      return data?.data;
    },
    refetchInterval: 1000,
  });

  console.log(sellerReplyMessage);

  return <div>{detailsId}</div>;
};

export default SellerReply;
