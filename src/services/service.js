export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map((item) => this._transformChar(item));
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`/characters/${id}`);
        return  this._transformChar(res);
    }

    getAllBooks = async () => {
        const res = await this.getResource(`/books/`);
        return res.map((item) => this._transformBook(item));
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book);
    }

    getAllHouses = async () => {
        const res = await this.getResource(`/houses/`);
        return res.map((item) => this._transformHouse(item));
    }
    
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }

    isContaine(data) {
        if (data) {
            return data
        } else {
            return 'any data here'
        }

    }

    _transformChar(char) {
        return {
            name: this.isContaine(char.name),
            gender: this.isContaine(char.gender),
            born: this.isContaine(char.born),
            died: this.isContaine(char.died),
            culture: this.isContaine(char.culture),
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons,
        }
    }

    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released,
        }
    }
    
}