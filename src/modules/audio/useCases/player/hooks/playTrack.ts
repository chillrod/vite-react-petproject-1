import axios from "axios";

export const playTrack = async ({
  device,
  access_token,
  getSelectedMusic,
}: any) => {
  const { uri } = getSelectedMusic;

  try {
    const request = await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${device.device_id}`,
      {
        uris: [uri],
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return request;
  } catch (err: any) {
    throw new Error(err);
  }
};
