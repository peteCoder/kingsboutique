import { sanityClient } from "@/lib/client";
import { getServerSession } from "next-auth";

export const getOrders = async () => {
  const session = await getServerSession();

  const users = await sanityClient.fetch(
    `*[_type == 'account' && email == '${session?.user?.email}']`
  );
  const activeUser = users?.length > 0 ? users[0] : {};

  const orderOfItems = "createdAt asc";

  const query = `*[_type == 'order'] | order(${orderOfItems}) {
    _id,
    user->{_id, name, email, image},
    paymentStatus,
    orderStatus,
    _createdAt,
    totalAmount,
    shippingDetails->{
        _id, 
        email, 
        customerName, 
        phone, 
        city,
        country, 
        address, 
        orderNote
    },
    ordereditems[]->{
        _id,
        orderedProduct->{
            _id,
            name,
            gallery[]->{
                _id,
                imageUrl{
                    asset->{url}
                },
                description
            }
        },
        name,
        quantity,
        unitPrice,
        subtotal
    }
  }`;

  const orders = await sanityClient.fetch(query);

  const currentUserOrders = orders.filter(
    (order: any) => order.user._id === activeUser._id
  );

  currentUserOrders.sort((a: any, b: any) => {
    const dateA: any = new Date(a._createdAt);
    const dateB: any = new Date(b._createdAt);

    return dateB - dateA;
  });

  return currentUserOrders;
};
