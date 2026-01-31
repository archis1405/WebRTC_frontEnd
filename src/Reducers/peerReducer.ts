import { ADD_PEER,REMOVE_PEER } from "../Actions/peerAction";

export type PeerState = Record<string, {stream: MediaStream}>;

type PeerAction =
    | {
        type: typeof ADD_PEER,
        payload: {
            peerId: string,
            stream: MediaStream
        }
    }
    | {
        type: typeof REMOVE_PEER,
        payload: {
            peerId: string,
            stream: MediaStream
        }
    };

// Re
export const PeerReducer  = (state: PeerState = {}, action: PeerAction): PeerState => {
    switch (action.type) {
        case ADD_PEER:
            return {
                ...state,
                [action.payload.peerId]: { stream: action.payload.stream }
            }

        case REMOVE_PEER:
            // eslint-disable-next-line no-case-declarations, @typescript-eslint/no-unused-vars
            const { [action.payload.peerId]: _, ...rest } = state;
            return rest;

        default:
            return {...state};
    }
}

export default PeerReducer;