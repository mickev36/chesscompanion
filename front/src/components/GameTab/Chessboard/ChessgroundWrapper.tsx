import React, { useEffect, useRef, useState } from 'react';
import { Chessground as ChessgroundApi } from 'chessground';
import './Chessboard.css';
import { Api } from 'chessground/api';
import { Config } from 'chessground/config';
import 'chessground/assets/chessground.base.css';
import 'chessground/assets/chessground.brown.css';
import 'chessground/assets/chessground.cburnett.css';

interface Props {
    config?: Partial<Config>;
}

function ChessgroundWrapper({ config = {} }: Props) {
    const [api, setApi] = useState<Api | null>(null);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref && ref.current && !api) {
            const chessgroundApi = ChessgroundApi(ref.current, {
                animation: { enabled: true, duration: 200 },
                ...config,
            });
            setApi(chessgroundApi);
        } else if (ref && ref.current && api) {
            api.set(config);
        }
    }, [ref, api, config]);

    useEffect(() => {
        api?.set(config);
    }, [api, config]);

    return <div ref={ref} />;
}

export default ChessgroundWrapper;
