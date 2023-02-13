import { Move } from 'chess.js';
import { MoveWithVariants } from '../../../common/types/types';

export function addMove(
    moveArray: MoveWithVariants[],
    selectedMove: number[],
    moveToAdd: Move
): { moves: MoveWithVariants[]; selectedMove: number[] } {
    if (moveArray.length === 0)
        return {
            moves: [moveToAdd],
            selectedMove,
        };
    const newMoveArray = JSON.parse(JSON.stringify(moveArray));
    if (selectedMove.length === 1) {
        if (selectedMove[0] === newMoveArray.length - 1) {
            console.log('Add move at end of variant');
            newMoveArray.push(moveToAdd);
            selectedMove[selectedMove.length - 1] += 1;
        } else {
            console.log('Create Variant');
            if (newMoveArray[selectedMove[0]].variants) {
                newMoveArray[selectedMove[0]].variants?.push([moveToAdd]);
            } else {
                newMoveArray[selectedMove[0]].variants = [[moveToAdd]];
            }
            selectedMove.push(selectedMove[0], 0);
        }

        return { moves: newMoveArray, selectedMove };
    } else {
        return addMove(
            moveArray[selectedMove[0]].variants![selectedMove[1]],
            selectedMove.slice(2),
            moveToAdd
        );
    }
}

export function getVariantFlatList(
    moveArray: MoveWithVariants[],
    selectedMove: number[]
): MoveWithVariants[] {
    const flatMoveList = [];

    if (moveArray.length === 0) return [];

    for (let i = 0; i <= selectedMove[0]; ++i) {
        flatMoveList.push(moveArray[i]);
    }

    if (selectedMove.length === 1) {
        return flatMoveList;
    } else {
        flatMoveList.pop();
        return flatMoveList.concat(
            getVariantFlatList(
                moveArray[selectedMove[0]].variants![selectedMove[1]],
                selectedMove.slice(2)
            )
        );
    }
}
