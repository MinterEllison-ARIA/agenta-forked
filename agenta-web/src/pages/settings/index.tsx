import Secrets from "@/components/pages/settings/Secrets/Secrets"
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute"
import {useProjectData} from "@/contexts/project.context"
import {useQueryParam} from "@/hooks/useQuery"
import {dynamicComponent} from "@/lib/helpers/dynamic"
import {isDemo} from "@/lib/helpers/utils"
import {ApartmentOutlined, KeyOutlined, LockOutlined} from "@ant-design/icons"
import {Space, Tabs, Typography} from "antd"
import {useRouter} from "next/router"
import {useEffect} from "react"
import {createUseStyles} from "react-jss"

const useStyles = createUseStyles({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    heading: {
        marginTop: "1rem",
        marginBottom: "1rem !important",
    },
    tabs: {
        height: "calc(100vh - 228px)",
        "& .ant-tabs-content-holder": {
            position: "relative",
            overflow: "auto",
        },
    },
})

const Settings: React.FC = () => {
    const [tab, setTab] = useQueryParam("tab", isDemo() ? "workspace" : "secrets")
    const classes = useStyles()
    const router = useRouter()
    const {project} = useProjectData()

    useEffect(() => {
        if (project?.is_demo) {
            router.push("/apps")
        }
    }, [project, router])

    //dynamic components for demo
    const WorkspaceManage = dynamicComponent(`pages/settings/WorkspaceManage/WorkspaceManage`)
    const APIKeys = dynamicComponent(`pages/settings/APIKeys/APIKeys`)

    const items = [
        {
            label: (
                <Space>
                    <ApartmentOutlined />
                    Workspace
                </Space>
            ),
            key: "workspace",
            children: <WorkspaceManage />,
            hidden: !isDemo(),
        },
        {
            label: (
                <Space>
                    <LockOutlined />
                    LLM Keys
                </Space>
            ),
            key: "secrets",
            children: <Secrets />,
        },
        {
            label: (
                <Space>
                    <KeyOutlined />
                    API Keys
                </Space>
            ),
            key: "apiKeys",
            children: <APIKeys />,
            hidden: !process.env["NEXT_PUBLIC_FEATURE_API_KEYS"],
        },
    ]

    return (
        <div className={classes.root}>
            <Typography.Title className={classes.heading} level={3}>
                Settings
            </Typography.Title>
            <Tabs
                className={classes.tabs}
                onChange={setTab}
                activeKey={tab}
                items={items.filter((item) => !item.hidden)}
            />
        </div>
    )
}

export default () => (
    <ProtectedRoute>
        <Settings />
    </ProtectedRoute>
)
