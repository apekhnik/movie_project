'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import styled from 'styled-components';
import { vertFunc } from '@/shader-slider/vertFunc';
import { fragmentFunc } from '@/shader-slider/fragmentFunc';

const PrevButton = styled.button`
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    border: none;
    padding: 10px;
    cursor: pointer;
    z-index: 10;
    &:hover {
        background: rgba(0, 0, 0, 0.8);
    }
`;

const NextButton = styled.button`
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    border: none;
    padding: 10px;
    cursor: pointer;
    z-index: 10;
    &:hover {
        background: rgba(0, 0, 0, 0.8);
    }
`;

const Slider = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const currentSlide = useRef<number>(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const texturesRef = useRef<THREE.Texture[]>([]);
    const images = [
        '/images/1.png',
        '/images/2.png',
        '/images/3.png',
        '/images/4.png',
        '/images/5.png',
    ];

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
        camera.position.z = 1;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        const loader = new THREE.TextureLoader();
        texturesRef.current = images.map((img) => loader.load(img));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                progress: { value: 0.0 },
                from: { value: texturesRef.current[0] },
                to: { value: texturesRef.current[1] },
                intensity: { value: 0.1 },
            },
            vertexShader: vertFunc(),
            fragmentShader: fragmentFunc(),
        });
        materialRef.current = material;

        const geometry = new THREE.PlaneGeometry(2, 2);
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Функция для переключения слайдов
        const switchSlide = () => {
            if (materialRef.current && texturesRef.current.length > 0) {
                const nextSlide = (currentSlide.current + 1) % images.length;
                // Устанавливаем следующую текстуру в "to"
                materialRef.current.uniforms.to.value = texturesRef.current[nextSlide];
                gsap.to(materialRef.current.uniforms.progress, {
                    value: 1,
                    duration: 3, // Длительность анимации
                    ease: 'power2.inOut',
                    onComplete: () => {
                        // После завершения анимации обновляем текущий слайд и сбрасываем progress
                        currentSlide.current = nextSlide;
                        materialRef.current!.uniforms.from.value = texturesRef.current[nextSlide];
                        materialRef.current!.uniforms.progress.value = 0;
                    },
                });
            }
        };

        // Первый переход с задержкой
        const initialTimeout = setTimeout(() => {
            switchSlide();
            // Запускаем интервал для последующих переходов
            intervalRef.current = setInterval(switchSlide, 11000); // 8 сек пауза + 3 сек анимация
        }, 8000); // Задержка перед первым переключением

        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            clearTimeout(initialTimeout);
        };
    }, []);

    const handlePrev = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (materialRef.current && texturesRef.current.length > 0) {
            const nextSlide = (currentSlide.current - 1 + images.length) % images.length;
            materialRef.current.uniforms.to.value = texturesRef.current[nextSlide];
            gsap.to(materialRef.current.uniforms.progress, {
                value: 1,
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    currentSlide.current = nextSlide;
                    materialRef.current!.uniforms.from.value = texturesRef.current[nextSlide];
                    materialRef.current!.uniforms.progress.value = 0;
                },
            });
        }
    };

    const handleNext = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (materialRef.current && texturesRef.current.length > 0) {
            const nextSlide = (currentSlide.current + 1) % images.length;
            materialRef.current.uniforms.to.value = texturesRef.current[nextSlide];
            gsap.to(materialRef.current.uniforms.progress, {
                value: 1,
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    currentSlide.current = nextSlide;
                    materialRef.current!.uniforms.from.value = texturesRef.current[nextSlide];
                    materialRef.current!.uniforms.progress.value = 0;
                },
            });
        }
    };

    return (
        <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', top: '64px' }}>
            {/*<PrevButton onClick={handlePrev}>*/}
            {/*    <img src="/images/icons/left-arrow.png" alt="Previous" />*/}
            {/*</PrevButton>*/}
            {/*<NextButton onClick={handleNext}>*/}
            {/*    <img src="/images/icons/right-arrow.png" alt="Next" />*/}
            {/*</NextButton>*/}
        </div>
    );
};

export default Slider;
