export const getAllStatesData = async (year) => {
    const response = await fetch(`/asset/${year}.json`);
    const data = await response.json();
    return data;
}

export const getStateData = async (year, state) => {
    const response = await fetch(`/asset/${year}.json`);
    const data = await response.json();
    const stateData = data.filter(currentState => currentState.area_name === state);
    return stateData;
}