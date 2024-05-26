"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getSearch();
  }, [page]);

  function getSearch() {
    const apiKey = "AIzaSyCdCaUiLUiH06SEY2XC95WLLzldbXmvx8w";
    const programmableSearchEngineId = "f3f970cd7715a4fcc";

    fetch(
      `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${programmableSearchEngineId}&key=${apiKey}&num=10&start=${
        (page - 1) * 10 + 1
      }`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error, network res was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data.items);
      })
      .catch((error) => {
        console.error("There was an issue with searching: ", error);
      });
  }
  return (
    <>
      <div className="flex flex-col items-center">
      <Image className="mt-[2%]" src="/logo.png" alt="Logo" width={500} height={300} />
        <div
          id="search-container"
          className=" w-[100%] flex flex-row justify-center"
        >
          <input
            className="text-black rounded-xl p-2 pl-3 w-[40%]"
            type="text"
            placeholder="Search in Zadeshare Search Engine"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getSearch();
              }
            }}
          />
        </div>

        <div className="h-full w-full flex flex-col">
          {items &&
            items.map((item, index) => (
              <>
                <div
                  key={index}
                  className="w-[80%] h-[10%] ml-[20%] mt-[2.5%] mb-[2.5%]"
                >
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="text-blue-600">
                    <a href={item.link}>{item.displayLink}</a>
                  </p>

                  <p className="text-xs">{item.snippet}</p>
                </div>
                <div className="w-[60%] ml-[20%] bg-gray-300 h-[0.5px]"></div>
              </>
            ))}
        </div>
        {items[0] != undefined ? (
          <div className="flex flex-row">
            {page == 1 ? (
              <>
                <button className="w-[2vw] h-[2vw] border-2 border-gray-100 text-blue-500">
                  {page}
                </button>
                <button
                  onClick={() => {
                    setPage((prev) => prev + 1);
                  }}
                  className="w-[2vw] h-[2vw] border-2 border-gray-100 text-gray-100"
                >
                  {page + 1}
                </button>
                <button
                  onClick={() => {
                    setPage((prev) => prev + 2);
                  }}
                  className="w-[2vw] h-[2vw] border-2 border-gray-100 text-gray-100"
                >
                  {page + 2}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setPage((prev) => prev - 1);
                  }}
                  className="w-[2vw] h-[2vw] border-2 border-gray-100 text-gray-100"
                >
                  {page - 1}
                </button>
                <button className="w-[2vw] h-[2vw] border-2 border-gray-100 text-blue-500">
                  {page}
                </button>
                <button
                  onClick={() => {
                    setPage((prev) => prev + 1);
                  }}
                  className="w-[2vw] h-[2vw] border-2 border-gray-100 text-gray-100"
                >
                  {page + 1}
                </button>
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
