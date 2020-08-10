export const headerProps = {
  links: [
    {
        label: "Home",
        route: "/"
    },
    {
        label: "My Orders",
        route: "/my-orders"
    },
    {
        label: "Cart",
        route: "/my-cart"
    }
  ]
};

export const toastyOptions: any = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}