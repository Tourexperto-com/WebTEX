<template>
    <footer class="mt-12">
        <div class="flex flex-col items-center gap-6 bg-gray-light py-6 px-9">
            <div>
                <div class="flex flex-col items-center gap-6">
                    <NuxtImg src="/images/TEX-Logo.svg" alt="Tex Logo" class="h-12" />
                    <div class="flex items-center gap-3">
                        <NuxtImg v-for="(sello, index) in sellos" :src="sello.img" :alt="sello.alt" :key="index"
                            class="h-16" />
                    </div>
                </div>
                <div class="flex flex-wrap items-center justify-center gap-3 mt-3">
                    <NuxtImg v-for="(travel, index) in travels" :src="travel.img" :alt="travel.alt" :key="index"
                        class="h-16" />
                </div>
            </div>
            <span class="w-[15.5rem] h-[1px] bg-gray-extraLight"></span>
            <div class="flex flex-col items-center gap-6">
                <div class="flex flex-col items-center gap-6">
                    <div class="flex flex-col items-center gap-6">
                        <div class="flex flex-col items-center gap-3">
                            <p class="font-bold text-secondary text-xs">Contacto</p>
                            <NuxtLink to="mailto:info@tourexperto.com" class="flex items-center gap-1">
                                <Icon name="material-symbols:mail-outline-rounded" class="text-secondary" />
                                <span class="font-medium text-secondary text-xs underline">info@tourexperto.com</span>
                            </NuxtLink>
                            <NuxtLink to="tel:+1234567890" class="flex items-center gap-1">
                                <NuxtImg src="/images/icons/WhatsApp.svg" alt="WhatsApp" class="w-3 h-3" />
                                <span class="font-medium text-secondary text-xs underline">+1 (754) 267 3454</span>
                            </NuxtLink>
                            <ButtonSecondary :to="ROUTE_NAMES.CITA_VIRTUAL" class="!px-6">
                                Agendar cita virtual
                            </ButtonSecondary>
                        </div>
                        <div class="flex flex-col items-center text-center gap-3">
                            <p class="font-bold text-secondary text-xs">Teléfonos locales</p>
                            <p v-for="(telefono, index) in telefonos" :key="index"
                                class="text-secondary text-xs font-medium">
                                {{ telefono.pais }}
                                <NuxtLink :to="`tel:${telefono.numero}`" class="underline">{{ telefono.numero }}
                                </NuxtLink>
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col items-center gap-6">
                        <div class="flex flex-col items-center gap-6">
                            <div class="flex flex-col items-center text-center gap-3">
                                <p class="font-bold text-secondary text-xs">Nosotros</p>
                                <ul class="flex flex-col gap-3">
                                    <li v-for="(item, index) in nosotros" :key="index">
                                        <NuxtLink :to="item.ruta" class="text-secondary text-xs font-medium">
                                            {{ item.nombre }}
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>
                            <div class="flex flex-col items-center text-center gap-3">
                                <p class="font-bold text-secondary text-xs">Ayuda</p>
                                <ul class="flex flex-col gap-3">
                                    <li v-for="(item, index) in ayuda" :key="index">
                                        <NuxtLink :to="item.ruta" class="text-secondary text-xs font-medium">
                                            {{ item.nombre }}
                                        </NuxtLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="flex flex-col items-center gap-3">
                            <div class="flex flex-col items-center gap-2">
                                <p class="font-bold text-secondary text-xs">Síguenos</p>
                                <div class="flex justify-between items-center gap-3">
                                    <NuxtLink v-for="(red, index) in redes" :key="index" :to="red.link"
                                        class="w-8 h-8 bg-contain bg-no-repeat bg-center"
                                        :style="`background-image: url('${red.img}')`">
                                    </NuxtLink>
                                </div>
                            </div>
                            <TripadvisorReviews url="#" />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-center gap-6">
                    <div class="flex flex-col items-center gap-3">
                        <p class="font-bold text-secondary text-xs">Operamos de manera local en cada país</p>
                        <SegmentoBanderas :variant="'footer'" @regionSelected="handleRegionSelected" />
                    </div>
                    <div class="flex flex-col items-center text-center gap-3">
                        <p class="font-bold text-secondary text-xs">Métodos de pago</p>
                        <div class="flex flex-wrap justify-center items-center gap-2">
                            <div v-for="(metodo, index) in metodos" :key="index"
                                class="w-14 h-8 bg-light bg-contain bg-no-repeat bg-center rounded-[3px] shadow-1"
                                :style="`background-image: url('${metodo}')`"></div>
                        </div>
                        <p class="text-secondary font-medium text-xs">Contamos con <NuxtLink
                                to="#" class="underline">medios de pago locales</NuxtLink>
                        </p>
                    </div>
                    <div class="flex flex-col items-center gap-3">
                        <p class="font-bold text-secondary text-xs">Nuestro equipo</p>
                        <div class="flex flex-wrap justify-center items-center gap-2">
                            <NuxtImg v-for="(item, index) in equipo" :key="index" :src="item.img" :alt="item.alt"
                                class="h-20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col items-center text-center gap-3 bg-secondary py-8 px-4">
            <p class="text-primary font-medium text-xs">TourExperto.com es operado por TravelExpert.LLC a Delaware
                limited liability company.</p>
            <p class="text-light font-medium text-xs">Office: 1201 N Orange St Ste 600, Wilmington, DE 19801-1171, USA.</p>
            <span class="w-72 h-[1px] bg-gray-extraLight"></span>
            <p class="text-light font-medium text-xs">© Copyright 2025 Tour Experto</p>
        </div>
    </footer>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';

const handleRegionSelected = () => {
    // En el footer no hacemos nada especial al seleccionar región
}

const sellos = [
    { img: '/images/sellos/global-travel.svg', alt: 'Global Travel' },
    { img: '/images/sellos/feature-agency.svg', alt: 'Feature Agency' },
    { img: '/images/sellos/safe-travels.svg', alt: 'Safe Travels' },
];

const travels = [
    { img: '/images/sellos/travel-spain.svg', alt: 'Travel Span' },
    { img: '/images/sellos/travel-usa.svg', alt: 'Travel USA' },
    { img: '/images/sellos/travel-mexico.svg', alt: 'Travel Mexico' },
    { img: '/images/sellos/travel-argentina.svg', alt: 'Travel Argentina' },
    { img: '/images/sellos/travel-colombia.svg', alt: 'Travel Colombia' },
];

const telefonos = [
    { pais: "Argentina", numero: "+541152372827" },
    { pais: "Chile", numero: "+56224053096" },
    { pais: "Colombia", numero: "+576017702903" },
    { pais: "España", numero: "+34910601755" },
    { pais: "Estados Unidos", numero: "+13022087264" },
    { pais: "México", numero: "+525585262118" },
];

const nosotros = [
    { nombre: "Quienes somos", ruta: ROUTE_NAMES.QUIENES_SOMOS },
    { nombre: "Contacto", ruta: ROUTE_NAMES.CONTACTO },
    { nombre: "Ventajas Exclusivas", ruta: ROUTE_NAMES.VENTAJAS },
    { nombre: "Blog Tour Experto", ruta: ROUTE_NAMES.BLOG },
    { nombre: "Guías y Webinasr", ruta: ROUTE_NAMES.GUIAS_WEBINARS },
];

const ayuda = [
    { nombre: "Preguntas Frecuentes", ruta: ROUTE_NAMES.PREGUNTAS_FRECUENTES },
    { nombre: "Términos y Condiciones", ruta: ROUTE_NAMES.TERMINOS_CONDICIONES },
    { nombre: "Videos explicativos", ruta: ROUTE_NAMES.VIDEOS_EXPLICATIVOS },
    { nombre: "Instala tu eSIM", ruta: ROUTE_NAMES.ESIM },
];

const redes = [
    { img: "/images/redes/instagram.png", alt: "", link: ROUTE_NAMES.REDES.INSTAGRAM },
    { img: "/images/redes/facebook.png", alt: "", link: ROUTE_NAMES.REDES.FACEBOOK },
    { img: "/images/redes/youtube.png", alt: "", link: ROUTE_NAMES.REDES.YOUTUBE },
    { img: "/images/redes/pinterest.png", alt: "", link: ROUTE_NAMES.REDES.PINTEREST },
    { img: "/images/redes/spotify.png", alt: "", link: ROUTE_NAMES.REDES.SPOTIFY },
    { img: "/images/redes/linkedin.png", alt: "", link: ROUTE_NAMES.REDES.LINKEDIN },
];

const metodos = [
    "/images/metodos/visa.png",
    "/images/metodos/mastercard.png",
    "/images/metodos/american-express.png",
    "/images/metodos/dinners-club.png",
    "/images/metodos/bank-of-america.png",
    "/images/metodos/morgan-stanley.png",
    "/images/metodos/jcb.png",
];

const equipo = [
    { img: "/images/equipo/footer-1.png", alt: "" },
    { img: "/images/equipo/footer-1.png", alt: "" },
    { img: "/images/equipo/footer-1.png", alt: "" },
    { img: "/images/equipo/footer-1.png", alt: "" },
];
</script>