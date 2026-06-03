const memories = JSON.parse(localStorage.getItem("memories")) || {};
const prefectureNames = {
    "JP-01": "Hokkaido",
    "JP-02": "Aomori",
    "JP-03": "Iwate",
    "JP-04": "Miyagi",
    "JP-05": "Akita",
    "JP-06": "Yamagata",
    "JP-07": "Fukushima",
    "JP-08": "Ibaraki",
    "JP-09": "Tochigi",
    "JP-10": "Gunma",
    "JP-11": "Saitama",
    "JP-12": "Chiba",
    "JP-13": "Tokyo",
    "JP-14": "Kanagawa",
    "JP-15": "Niigata",
    "JP-16": "Toyama",
    "JP-17": "Ishikawa",
    "JP-18": "Fukui",
    "JP-19": "Yamanashi",
    "JP-20": "Nagano",
    "JP-21": "Gifu",
    "JP-22": "Shizuoka",
    "JP-23": "Aichi",
    "JP-24": "Mie",
    "JP-25": "Shiga",
    "JP-26": "Kyoto",
    "JP-27": "Osaka",
    "JP-28": "Hyogo",
    "JP-29": "Nara",
    "JP-30": "Wakayama",
    "JP-31": "Tottori",
    "JP-32": "Shimane",
    "JP-33": "Okayama",
    "JP-34": "Hiroshima",
    "JP-35": "Yamaguchi",
    "JP-36": "Tokushima",
    "JP-37": "Kagawa",
    "JP-38": "Ehime",
    "JP-39": "Kochi",
    "JP-40": "Fukuoka",
    "JP-41": "Saga",
    "JP-42": "Nagasaki",
    "JP-43": "Kumamoto",
    "JP-44": "Oita",
    "JP-45": "Miyazaki",
    "JP-46": "Kagoshima",
    "JP-47": "Okinawa"
};

const visitedPlacesEl = document.getElementById("visited-places");
const visitedPrefecturesEl = document.getElementById("visited-prefectures");
const averageRatingEl = document.getElementById("average-rating");
const mostVisitedPrefectureEl = document.getElementById("most-visited-prefecture");
const favoritePrefectureEl = document.getElementById("favorite-prefecture");
const highestRatedPlaceEl = document.getElementById("highest-rated-place");
const completionEl = document.getElementById("completion");

let visitedPlaces = 0;
let visitedPrefectures = 0;
let totalRating = 0;

let mostVisitedPrefecture = "-";
let mostVisitedCount = 0;

let favoritePrefecture = "-";
let favoritePrefectureAverage = 0;

let highestRatedPlace = "-";
let highestRating = 0;

Object.keys(memories).forEach((prefectureId) => {

    const entries = memories[prefectureId];

    if (entries.length === 0) return;

    visitedPrefectures++;

    // Most visited prefecture
    if (entries.length > mostVisitedCount) {
        mostVisitedCount = entries.length;
        mostVisitedPrefecture =
            prefectureNames[prefectureId] || prefectureId;
    }

    let prefectureRatingSum = 0;

    entries.forEach((entry) => {

        visitedPlaces++;

        const rating = Number(entry.rating);

        totalRating += rating;
        prefectureRatingSum += rating;

        if (rating > highestRating) {
            highestRating = rating;
            highestRatedPlace = entry.city;
        }

    });

    const prefectureAverage =
        prefectureRatingSum / entries.length;

    if (prefectureAverage > favoritePrefectureAverage) {
        favoritePrefectureAverage = prefectureAverage;
        favoritePrefecture =
            prefectureNames[prefectureId] || prefectureId
    }

});

const averageRating =
    visitedPlaces > 0
        ? (totalRating / visitedPlaces).toFixed(2)
        : "0.00";

const completion =
    ((visitedPrefectures / 47) * 100).toFixed(2);

visitedPlacesEl.textContent = visitedPlaces;

visitedPrefecturesEl.textContent =
    `${visitedPrefectures}/47`;

averageRatingEl.textContent =
    `${averageRating}/5`;

mostVisitedPrefectureEl.textContent =
    mostVisitedPrefecture;

favoritePrefectureEl.textContent =
    favoritePrefecture;

highestRatedPlaceEl.textContent =
    highestRatedPlace;

completionEl.textContent =
    `${completion}%`;