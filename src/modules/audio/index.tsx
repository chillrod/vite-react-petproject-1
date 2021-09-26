import React, { useCallback, useEffect } from "react";

import { useRecoilValue, useSetRecoilState } from "recoil";

import { UserAuthController } from "../user/useCases/user-auth/controller";
import { MusicController } from "./useCases/music/controller";

import { MusicSection } from "./useCases/music";

import { InputComponent } from "../../shared-components/UI/Input";
import { TextComponent } from "../../shared-components/UI/Text";

import { AudioSection, AudioSearchSection } from "./styles";

export const Audio = () => {
  const isUserAuthenticated = useRecoilValue(
    UserAuthController.state.getIsUserAuthenticated
  );

  const setMusic = useSetRecoilState(MusicController.state.setMusic);
  const accessToken = useRecoilValue(UserAuthController.state.getToken);

  const getMusic = useRecoilValue(MusicController.state.getMusic);

  const handleSearchQuery = useCallback(
    (event) => {
      if (event.target.value.length) {
        MusicController.hooks
          .searchMusic({
            access_token: accessToken,
            query: event.target.value,
            type: "track",
          })
          .then((res) => {
            setMusic(res?.tracks?.items);
          });
      }

      if (!event.target.value.length) {
        MusicController.hooks
          .recommendedMusics({
            access_token: accessToken,
            type: "tracks",
          })
          .then((res) => {
            setMusic(res?.items);
          });
      }
    },
    [accessToken]
  );

  const handleRecommendations = useCallback(() => {
    if (isUserAuthenticated && !getMusic.length) {
      const getRecommendations = MusicController.hooks
        .recommendedMusics({
          access_token: accessToken,
          type: "tracks",
        })
        .then((res) => {
          setMusic(res?.items);
        });

      return getRecommendations;
    }
  }, [isUserAuthenticated]);

  useEffect(() => {
    handleRecommendations();
  }, [isUserAuthenticated, getMusic.length]);

  return (
    <>
      {isUserAuthenticated && (
        <AudioSection>
          <AudioSearchSection>
            <TextComponent text="Ready to play some music?" as="h4" size="xl" />
            <TextComponent
              text="Look at our recommendation based on your top picks or search your favorites"
              as="h4"
              isText
            />
            <InputComponent
              search
              placeholder="Search"
              onChange={handleSearchQuery}
              variant="filled"
            />
          </AudioSearchSection>
          {getMusic.length && <MusicSection items={getMusic} />}
        </AudioSection>
      )}
    </>
  );
};