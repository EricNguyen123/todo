import { Card, Skeleton } from 'antd';

const HomeSkeleton = () => {

  return (
            <div className="flex justify-start items-start">
              <Card  
                className="w-card-todo h-card-todo m-[0 auto 0 26px]"
                title={<Skeleton.Input active />}
              >
                <Skeleton.Input
                  active
                  style={{
                    width: "230px",
                    marginTop: "8px",
                    height: "60px",
                  }}
                />
                <div className="flex items-center justify-between mt-[16px]">
                  <div>
                    <Skeleton.Button
                      active
                      style={{
                        width: "100px",
                        marginTop: "8px",
                        height: "14px",
                        marginRight: "10px",
                      }}
                    />
                  </div>
                  <div>
                    <Skeleton.Button
                      active
                      style={{
                        width: "10px",
                        marginTop: "8px",
                        height: "14px",
                      }}
                    />
                  </div>
                </div>
              </Card>
            </div>
  );
}

export default HomeSkeleton
