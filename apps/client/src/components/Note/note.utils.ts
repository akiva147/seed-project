export const convertEmailDisplayNameToUppercasedName = (
    emailDisplayName: string
) => {
    const fullName = emailDisplayName.split('@')[0].split('.').join(' ');
    return fullName
        .split(' ')
        .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
        .join(' ');
};
