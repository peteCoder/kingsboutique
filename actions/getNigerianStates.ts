import RegionData from "@/json/regions.json";
import StateData from "@/json/states.json";




export const getNigerianStates = () => {
    // Returns all the states
    return StateData.states.map((state) => ({label: state, value: state}));
};

export const getNigerianRegionsAndShippingBasedOnState = (state: string) => {
    // Find the region data for the specified state
    const stateData = RegionData.find(region => Object.keys(region)[0] === state);
    
    if (!stateData) {
        return {
            regions: [],
        };
    }
    
    const [stateName, regions] = Object.entries(stateData)[0];
    
    // Create an object with region names and corresponding shipping fees
    const regionShippingFees = Object.entries(regions).map(([region, fee]) => ({
        label: region,
        value: region,
        fee: fee
    }));
    
    return {
        regions: regionShippingFees
    };
}
