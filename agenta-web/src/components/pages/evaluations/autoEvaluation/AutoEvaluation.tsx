import {_Evaluation, JSSTheme} from "@/lib/Types"
import {
    ArrowsLeftRight,
    Columns,
    Database,
    Gauge,
    GearSix,
    Note,
    Plus,
    Rocket,
    Trash,
} from "@phosphor-icons/react"
import {Button, Dropdown, Space, Spin, Table} from "antd"
import React, {useState} from "react"
import {createUseStyles} from "react-jss"
import {ColumnsType} from "antd/es/table"
import {MoreOutlined} from "@ant-design/icons"
import EvaluatorsModal from "./EvaluatorsModal/EvaluatorsModal"

const useStyles = createUseStyles((theme: JSSTheme) => ({
    button: {
        display: "flex",
        alignItems: "center",
    },
}))

const AutoEvaluation = () => {
    const classes = useStyles()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [isConfigEvaluatorModalOpen, setIsConfigEvaluatorModalOpen] = useState(false)

    const columns: ColumnsType<_Evaluation> = [
        {
            title: "Variant",
            dataIndex: "variants",
            key: "variants",
            fixed: "left",
            onHeaderCell: () => ({
                style: {minWidth: 160},
            }),
        },
        {
            title: "Test set",
            dataIndex: "testsetName",
            key: "testsetName",
            onHeaderCell: () => ({
                style: {minWidth: 160},
            }),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            onHeaderCell: () => ({
                style: {minWidth: 240},
            }),
        },
        {
            title: "Results",
            children: [
                {
                    title: "Evaluator 1",
                    dataIndex: "aggregated_results",
                    key: "results",
                    onHeaderCell: () => ({
                        style: {minWidth: 240},
                    }),
                },
                {
                    title: "Evaluator 2",
                    dataIndex: "aggregated_results",
                    key: "results",
                    onHeaderCell: () => ({
                        style: {minWidth: 240},
                    }),
                },
                {
                    title: "Evaluator 3",
                    dataIndex: "aggregated_results",
                    key: "results",
                    onHeaderCell: () => ({
                        style: {minWidth: 240},
                    }),
                },
            ],
        },
        {
            title: "Created on",
            dataIndex: "created_at",
            key: "createdAt",
            onHeaderCell: () => ({
                style: {minWidth: 160},
            }),
        },
        {
            title: "Avg. Latency",
            dataIndex: "average_latency",
            key: "average_latency",
            onHeaderCell: () => ({
                style: {minWidth: 160},
            }),
        },
        {
            title: "Total Cost",
            dataIndex: "average_cost",
            key: "average_cost",
            onHeaderCell: () => ({
                style: {minWidth: 160},
            }),
        },
        {
            title: <GearSix size={16} />,
            key: "key",
            width: 56,
            fixed: "right",
            align: "center",
            render: (_, record) => {
                return (
                    <Dropdown
                        trigger={["click"]}
                        overlayStyle={{width: 180}}
                        menu={{
                            items: [
                                {
                                    key: "details",
                                    label: "Open details",
                                    icon: <Note size={16} />,
                                    onClick: (e) => {
                                        e.domEvent.stopPropagation()
                                    },
                                },
                                {
                                    key: "variant",
                                    label: "View variant",
                                    icon: <Rocket size={16} />,
                                    onClick: (e) => {
                                        e.domEvent.stopPropagation()
                                    },
                                },
                                {
                                    key: "view_testset",
                                    label: "View test set",
                                    icon: <Database size={16} />,
                                    onClick: (e) => {
                                        e.domEvent.stopPropagation()
                                    },
                                },
                                {type: "divider"},
                                {
                                    key: "delete_eval",
                                    label: "Delete",
                                    icon: <Trash size={16} />,
                                    danger: true,
                                    onClick: (e) => {
                                        e.domEvent.stopPropagation()
                                    },
                                },
                            ],
                        }}
                    >
                        <Button
                            onClick={(e) => e.stopPropagation()}
                            type="text"
                            icon={<MoreOutlined />}
                            size="small"
                        />
                    </Dropdown>
                )
            },
        },
    ]

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <Space>
                    <Button type="primary" icon={<Plus size={14} />} className={classes.button}>
                        Start new evaluation
                    </Button>
                    <Button
                        icon={<Gauge size={14} />}
                        className={classes.button}
                        onClick={() => setIsConfigEvaluatorModalOpen(true)}
                    >
                        Configure evaluators
                    </Button>
                </Space>
                <Space>
                    <Button
                        danger
                        type="text"
                        icon={<Trash size={14} />}
                        className={classes.button}
                    >
                        Delete
                    </Button>
                    <Button
                        type="text"
                        icon={<ArrowsLeftRight size={14} />}
                        className={classes.button}
                    >
                        Compare
                    </Button>
                    <Button icon={<Columns size={14} />} className={classes.button}>
                        Edit columns
                    </Button>
                </Space>
            </div>

            <Spin spinning={false}>
                <Table
                    rowSelection={{
                        type: "checkbox",
                        columnWidth: 48,
                        onChange: (selectedRowKeys: React.Key[]) => {
                            setSelectedRowKeys(selectedRowKeys)
                        },
                    }}
                    className="ph-no-capture"
                    columns={columns}
                    rowKey={"id"}
                    dataSource={[]}
                    scroll={{x: true}}
                    bordered
                    pagination={false}
                    onRow={(record) => ({
                        style: {cursor: "pointer"},
                        onClick: () => {},
                    })}
                />
            </Spin>

            <EvaluatorsModal
                open={isConfigEvaluatorModalOpen}
                onCancel={() => setIsConfigEvaluatorModalOpen(false)}
            />
        </div>
    )
}

export default AutoEvaluation
