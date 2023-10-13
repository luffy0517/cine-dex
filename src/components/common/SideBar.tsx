"use client";
import { BASE_URL } from "@/utils/Const";
import { Divider, Link } from "@nextui-org/react";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Igenre {
  id: string;
  name: string;
}

const SideBar = ({ className }: any) => {
  const [genres, setGenres] = useState([]);
  const [seletedGenre, setSelectedGenre] = useState("");
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=pt-BR`
        );
        setGenres(response.data.genres);
        console.log(response.data.genres);
      } catch (err) {
        console.log("Erro(NavBar): " + err);
      }
    };

    fetchGenres();
  }, [setGenres]);

  useEffect(() => {
    const getSelectedGenre = () => {
      const genreQueryParam = searchParams.get("genre");
      const idParam = params.id;

      if (genreQueryParam) {
        setSelectedGenre(genreQueryParam);
      } else {
        setSelectedGenre(idParam.toString());
      }
    };

    getSelectedGenre();
  }, [searchParams, params.id]);

  return (
    <div className="shadow-lg h-screen pt-3 hidden sm:block">
      <div className="text-center">
        <div className="px-3 py-2">
          <h2 className="mb-2 text-lg font-semibold tracking-tight">
            Descubra
          </h2>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => router.push("/discover/popular")}
              size="sm"
            >
              <Link
                color="foreground"
                className="w-full text-tiny justify-center hover:bg-zinc-400/20 p-2 rounded-lg"
                href="/discover/now"
                size="lg"
              >
                Em cartaz
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => router.push("/discover/popular")}
              size="sm"
            >
              <Link
                color="foreground"
                className="w-full text-tiny justify-center hover:bg-zinc-400/20 p-2 rounded-lg"
                href="/discover/popular"
                size="lg"
              >
                Populares
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => router.push("/discover/popular")}
              size="sm"
            >
              <Link
                color="foreground"
                className="w-full text-tiny justify-center hover:bg-zinc-400/20 p-2 rounded-lg"
                href="/discover/now"
                size="lg"
              >
                Melhores avaliações
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => router.push("/discover/popular")}
              size="sm"
            >
              <Link
                color="foreground"
                className="w-full text-tiny justify-center hover:bg-zinc-400/20 p-2 rounded-lg "
                href="/discover/upcoming"
                size="lg"
              >
                Próximos lançamentos
              </Link>
            </Button>
          </div>
        </div>
        <Divider className="my-2" />
        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Gêneros
          </h2>
          <ScrollArea className="h-[275px] px-1">
            <div className="space-y-1 p-2">
              {genres.map((genre: Igenre) => (
                <p key={genre.id}>
                  <Link
                    color="foreground"
                    className="w-full text-tiny justify-center hover:bg-zinc-400/20 p-2 rounded-lg "
                    href={`/genres/${
                      genre.id
                    }?genre=${genre.name.toLocaleLowerCase()}`}
                    size="lg"
                  >
                    {genre.name}
                  </Link>
                </p>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default SideBar;