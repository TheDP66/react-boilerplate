import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, FloatButton, Spin, Table } from "antd";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { charactersColumn } from "../../constant/columns/characters";
import {
  GET_CHARACTERS
} from "../../constant/queries/character";
import { Can } from "../../context/AbilityContext";
import StickyHeader from "../../layouts/StickyHeader";
import { useQueryGql } from "../../lib/useQueryGql";

const { RangePicker } = DatePicker;

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, loading } = useQueryGql(GET_CHARACTERS);

  const [startDate, setStartDate] = useState(dayjs().add(-7, "days"));
  const [endDate, setEndDate] = useState(dayjs());

  // const [getCharacter, { data: charData, loading: charLoad }] = useLazyQuery(
  //   GET_CHARACTER,
  //   { variables: { id: 2 } }
  // );

  const handleChangeDate = (date) => {
    setStartDate(date[0]);
    setEndDate(date[1]);
  };

  // ? Auto redirect to previous page after login
  useEffect(() => {
    if (Cookies.get("redirect_uri")) {
      const uri = Cookies.get("redirect_uri");
      Cookies.remove("redirect_uri");
      navigate(uri);
    }
  }, []);

  return (
    <div>
      <Spin spinning={loading} size="large">
        <StickyHeader title={t("title")}>
          <RangePicker
            placement="bottomRight"
            presets={[
              {
                label: "Last 7 days",
                value: [dayjs().add(-7, "days"), dayjs()],
              },
              {
                label: "Last 30 days",
                value: [dayjs().add(-30, "days"), dayjs()],
              },
            ]}
            onChange={handleChangeDate}
            value={[startDate, endDate]}
            format={"DD/MM/YYYY"}
            allowClear={false}
          />

          <Button icon={<DownloadOutlined />} size="middle" title="Export" />
        </StickyHeader>

        <div style={{ padding: 32 }}>
          <Table
            loading={loading}
            columns={charactersColumn()}
            dataSource={data?.characters?.results ?? []}
            scroll={{ x: 1000 }}
          />
        </div>
      </Spin>

      <Can I="create" a="dashboard">
        <FloatButton
          shape="square"
          type="primary"
          tooltip="Add new character"
          style={{ width: 56, height: 56 }}
          icon={<PlusOutlined />}
        />
      </Can>
    </div>
  );
};

export default Dashboard;
