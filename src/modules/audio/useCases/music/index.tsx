import React from "react";

import { returnImageUrl } from "../../../../helpers/imageUrl";
import { returnIndexOfArray } from "../../../../helpers/returnIndex";
import { returnArtist } from "../../../../helpers/returnArtist";

import { TextComponent } from "../../../../shared-components/UI/Text";

import { MusicCard, MusicCardData, MusicList } from "./styles";

interface MusicSectionProps {
  items: {
    name?: string;
    uri?: string;

    album?: {
      name?: string;

      artists?: {
        name?: string;
      };

      images?: {
        url?: string;
        height?: number;
        width?: number;
      };
    };
  }[];
  selectedTrack: (musicTrack: {
    uri?: string;
    name?: string;
    image?: string;
  }) => void;
}

export const MusicSection = ({ items, selectedTrack }: MusicSectionProps) => {
  return (
    <MusicList>
      {items.length &&
        items.map((musicTrack) => (
          <MusicCard
            initial={false}
            whileTap={{ scale: 1.05 }}
            drag="y"
            dragElastic={1}
            onDragStart={() => console.log({ music: musicTrack.name })}
            dragConstraints={{ top: 10, bottom: 30 }}
            key={musicTrack.uri}
            onClick={() =>
              selectedTrack({
                uri: musicTrack?.uri,
                name: musicTrack?.name,
                image: returnImageUrl(
                  returnIndexOfArray(musicTrack.album?.images, 1)
                ),
              })
            }
          >
            <>
              <img
                src={returnImageUrl(
                  returnIndexOfArray(musicTrack.album?.images, 1)
                )}
                alt=""
              />
              <MusicCardData>
                <TextComponent text={musicTrack.name} as="h2" size="md" />
                <TextComponent
                  text={
                    returnArtist(
                      returnIndexOfArray(musicTrack.album?.artists, 0)
                    ) || "Loading"
                  }
                  as="p"
                  size="sm"
                />
              </MusicCardData>
            </>
          </MusicCard>
        ))}
    </MusicList>
  );
};
