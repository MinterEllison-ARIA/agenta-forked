import {Environment} from "@/lib/Types"
import axios from "@/lib/helpers/axiosConfig"
import {getAgentaApiUrl} from "@/lib/helpers/utils"

export const fetchEnvironments = async (appId: string): Promise<Environment[]> => {
    const response = await fetch(`${getAgentaApiUrl()}/api/apps/${appId}/environments/`)

    if (response.status !== 200) {
        throw new Error("Failed to fetch environments")
    }

    const data: Environment[] = await response.json()
    return data
}

export const publishVariant = async (variantId: string, environmentName: string) => {
    await axios.post(`${getAgentaApiUrl()}/api/environments/deploy/`, {
        environment_name: environmentName,
        variant_id: variantId,
    })
}
