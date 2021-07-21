import React, { useCallback } from "react";
// Antd
import { Row, Col, Divider, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
// Services
import { HouseChargeServices } from "../../../../services";

export default function ImportDataByFile() {

    const handleOnActionUpload = useCallback(
        (file) => {
            console.log(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target.result.split("\r\n");
                console.log(result);
            }
            reader.readAsText(file);
            // console.log(reader.result);
            // HouseChargeServices.upload(file);
        },
        [],
    )

    const handleOnChangeUpload = useCallback(
        (info) => {
            const { status, name } = info.file;
            if (status !== 'uploading') {
                // message.loading(`${info.file}`)
                // console.log(info.file);
            }
            if (status === 'done') {
                message.success(`${name} file upload successfully`, 2);
            } else if (status === 'error') {
                message.error(`${name} file upload failed`, 2);
            }
        },
        [],
    )

    return (
        <>
            <Row className="import-data__file-heading">
                <Col span={24}>
                    <Divider orientation="left" plain>
                        <span className="file-heading__title">
                            Nhập dữ liệu bằng file
                        </span>
                    </Divider>
                </Col>
            </Row>
            <Row >
                <Col span={24}>
                    <Row className="import-data__file-upload">
                        <Col span={24}>
                            <Upload.Dragger
                                name="fileDataImport"
                                accept=".csv"
                                action={handleOnActionUpload}
                                maxCount={1}
                                onChange={handleOnChangeUpload}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Chọn hoặc kéo thả tệp vào đây</p>
                                <p className="ant-upload-hint">
                                    Chỉ được kéo thả 1 tệp duy nhất và tệp phải có đinh dạng đuôi là *.csv
                                </p>
                            </Upload.Dragger>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}