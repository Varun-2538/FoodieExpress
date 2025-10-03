// Utility functions for formatting data

export const formatPrice = (price: number): string => {
  return `₹${price}`
}



export const getCuisineDisplay = (cuisines: string[]): string => {
  if (cuisines.length <= 2) {
    return cuisines.join(", ")
  }
  return `${cuisines.slice(0, 2).join(", ")} +${cuisines.length - 2}`
}

export const getDeliveryFeeDisplay = (fee: number): string => {
  return fee === 0 ? "Free delivery" : `₹${fee} delivery fee`
}
