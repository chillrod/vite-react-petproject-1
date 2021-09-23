import axios from "axios";

const userDataBaseURL = "https://api.spotify.com/v1/me";

interface handleAuthenticatedUserProps {
  access_token: string;
}

export const handleAuthenticatedUser = async ({
  access_token,
}: handleAuthenticatedUserProps) => {
  try {
    const request = await axios.get(userDataBaseURL, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return request.data;
  } catch (err: any) {
    throw new Error(err);
  }
};
