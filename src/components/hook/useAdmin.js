import { useEffect, useState } from "react";

const useAdmin = (email) => {
  //alert(email)

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch(`https://interior-design-seven-psi.vercel.app/users/admin/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [email]);

  //alert(isAdmin);

  //console.log(isAdmin)

  return [isAdmin];
};

export default useAdmin;
