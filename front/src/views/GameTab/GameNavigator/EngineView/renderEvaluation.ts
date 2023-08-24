import { EngineData } from "../../../../../../common/types/types";

export default function renderEvaluation(playerToMove: 'w' | 'b', engineData: EngineData) {
    if (engineData.score.unit === 'mate') return 'M' + engineData.score.value;
    else if (engineData.score.unit === 'cp') {
        //UCI specifies the evaluation from the player's point of view
        let sign = '';
        const evalValue = engineData.score.value;
        if ((evalValue > 0 && playerToMove === 'w') || (evalValue < 0 && playerToMove === 'b'))
            sign = '+';
        else sign = '-';

        return sign + Math.abs(evalValue / 100).toFixed(1);
    }
};