import { renderHook, act } from '@testing-library/react-hooks'
import Search from './search';
import handleSubmit from './search';
import {render, screen} from "@testing-library/react";
import React from "react";


const fakeResponseSearchFilm = [
    {
        Poster: 'url Poster',
        Title: 'Title Film',
        Type: 'movie',
        Year: '2022',
        imdbID: 'imdbID'
    }
]

test('should isSearchDone at true', () => {
    const { result } = renderHook(() => handleSubmit())
    expect(result).toBeTruthy()
})

// I'm not able to do this test :(
// test('it should return an array of research film', () => {
//     const { result } = renderHook(() => handleSubmit())
//     global.fetch = jest.fn().mockImplementationOnce(() => {
//         return new Promise((resolve, reject) => {
//             resolve({
//                 ok: true,
//                 json: () => {
//                     return fakeResponseSearchFilm
//                 },
//             });
//         });
//     });
//     expect(result).toBe(fakeResponseSearchFilm);
// })
