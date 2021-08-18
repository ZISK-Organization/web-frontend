import React, { useEffect } from "react";
import { profilesService } from "../../Utils/ApiService";
import { useAuth0 } from "@auth0/auth0-react";
import { useLayout } from "../../Layout/LayoutContext";
import { useHistory } from "react-router";

export default function LoginRedirect() {
  const { isAuthenticated, user } = useAuth0();
  const layout = useLayout();
  const history = useHistory();

  useEffect(
    () => {
      if (isAuthenticated) {
        profilesService.get(
          "noauth/profileState",
          { userId: user?.sub },
          {
            success: (state: string) => {
              if (state === "Unregistered") {
                profilesService.post(
                  "noauth/register",
                  { userId: user?.sub, name: user?.name, surname: "", image: user?.picture, email: user?.email },
                  null,
                  {
                    success: () => history.push(`/Profile`),
                    error: () => layout.error("Při registraci došlo k chybě. Zkuste to prosím později."),
                  }
                );
              } else if (state === "Incomplete") {
                history.push(`/Profile`);
              } else {
                history.push(`/Tasks`);
              }
            },
            error: () => layout.error("Nepodařilo se zjistit informace o profilu, zkuste to prosím později."),
          }
        );
      }
    },
    //eslint-disable-next-line
    [isAuthenticated]
  );

  return <></>;
}
