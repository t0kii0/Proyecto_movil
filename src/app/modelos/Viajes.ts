// modelos/Viajes.ts

export interface ModelViajes {  
    id_viaje: number;
    origen: string;
    destino: string;
    asientos_disp: number;
    estado: string;
    origen_lat: string;    // Agrega estas propiedades
    origen_lng: string;
    destino_lat: string;
    destino_lng: string;
}
