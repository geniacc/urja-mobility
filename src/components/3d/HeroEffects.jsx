import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

export const HeroEffects = () => {
    return (
        <EffectComposer disableNormalPass multisampling={0}>
            {/* Makes any material with toneMapped={false} glow heavily */}
            <Bloom
                luminanceThreshold={0.5}
                luminanceSmoothing={0.9}
                mipmapBlur={false}
                intensity={1.2}
            />

            {/* DepthOfField has been removed to keep the city background crisp and sharp! */}

            {/* Darkens the edges of the canvas */}
            <Vignette eskil={false} offset={0.1} darkness={0.6} />
        </EffectComposer>
    );
};