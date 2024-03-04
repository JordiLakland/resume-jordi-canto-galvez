export function cssClass(...classes: any[]) {
    const classNames = (Array.isArray(classes[0]) ? classes[0] : classes)
        .filter(c => typeof c === 'string');
    return classNames.join(' ');
}