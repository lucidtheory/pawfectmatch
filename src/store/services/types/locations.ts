export type PostLocationsParams = string[];

export interface Coordinates {
    lat: number;
    lon: number;
}

export interface TopLeftBottomRight {
    top: Coordinates;
    left: Coordinates;
    bottom: Coordinates;
    right: Coordinates;
}

export interface BottomLeftTopRight {
    bottom_left: Coordinates;
    top_right: Coordinates;
}

export interface BottomRightTopLeft {
    bottom_right: Coordinates;
    top_left: Coordinates;
}

export interface ILocation {
    city?: string;
    state?: string;
    geoBoundingBox: TopLeftBottomRight
    | BottomLeftTopRight
    | BottomRightTopLeft;
}

export type PostLocationsResponse = ILocation[];

export interface PostLocationSearchParams {
    city?: string;
    states?: string[];
    geoBoundingBox: TopLeftBottomRight
    | BottomLeftTopRight
    | BottomRightTopLeft;
    size?: number;
    from?: number;
}

export interface PostLocationsSearchResponse {
    results: ILocation[];
    total: number;
}