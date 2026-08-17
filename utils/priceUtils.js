// export function calculateSubtotal(items) {

//     return items.reduce(
//         (total, item) => total + item.price * item.quantity,
//         0
//     );
// }

export function calculateTax(subtotal, taxRate = 0.08) {

    return subtotal * taxRate;
}

export function calculateTotal(subtotal, tax) {

    return subtotal + tax;
}

export function calculateSubtotal(items) {

    if (!Array.isArray(items)) {
        throw new Error("Items must be an array");
    }

    return items.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );
}