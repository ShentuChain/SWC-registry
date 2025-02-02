import Link from "next/link";
import { Row, Col, Card, Tag, Typography } from "antd";

const { Text, Title } = Typography;

function swcIdToWeight(id) {
  if (id.startsWith("SWC-CTK-")) {
    return parseInt(id.slice("SWC-CTK-".length), 10);
  } else {
    // add 9999 to make swc after SWC-CTK
    return parseInt(id.slice("SWC-".length), 10) + 9999;
  }
}

export function sortBySwcId(id1, id2) {
  return swcIdToWeight(id1) - swcIdToWeight(id2);
}

export default function SWCCards({ swcs, t }) {
  return (
    <Row gutter={[24, 24]}>
      {Object.keys(swcs)
        .sort(sortBySwcId)
        .map((id, i) => {
          const swc = swcs[id];
          return (
            <Col span={24} md={12} lg={8} key={i + 1}>
              <Link href={`/${id}`}>
                <Card
                  style={{
                    border: "1px solid rgba(77, 99, 128, 0.3)",
                    borderRadius: 4,
                    boxShadow: "0px 2px 16px rgba(0, 0, 0, 0.05)",
                    cursor: "pointer"
                  }}
                >
                  <Title
                    level={4}
                    style={{
                      color: "#4D6380",
                      fontWeight: 600,
                      lineHeight: "20px",
                      marginBottom: 12
                    }}
                  >
                    {id}
                  </Title>
                  <Text
                    style={{
                      color: "rgba(51, 51, 51, 0.8)",
                      display: "block",
                      fontWeight: 400,
                      lineHeight: "40px",
                      marginBottom: 12,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {swc.content.Title}
                  </Text>
                </Card>
              </Link>
            </Col>
          );
        })}
    </Row>
  );
}

function getRelationName(relationships) {
  const endingSquareBracketIdx = relationships.indexOf("]");

  const name = relationships.slice(1, endingSquareBracketIdx);

  if (name.length > 40) {
    return `${name.slice(0, 40)}...`;
  } else {
    return name;
  }
}
