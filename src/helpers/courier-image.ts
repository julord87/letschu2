type ValidCourier = 'correo_argentino' | 'fedex' | 'dhl' | 'oca' | 'andreani' | 'ups';

export function getCourierImage(courier: ValidCourier): string {
    switch (courier) {
        case 'correo_argentino':
            return 'bg-correo-argentino';
        case 'fedex':
            return 'bg-fedex';
        case 'dhl':
            return 'bg-dhl';
        case 'oca':
            return 'bg-oca';
        case 'andreani':
            return 'bg-andreani';
        case 'ups':
            return 'bg-ups';
        default:
            return '';
    }
}