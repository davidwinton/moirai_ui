"use client";

import React from "react";
import { DefaultPageLayout } from "@/subframe/layouts/DefaultPageLayout";
import { Badge } from "@/subframe/components/Badge";
import { VerticalStepper } from "@/subframe/components/VerticalStepper";
import * as SubframeCore from "@subframe/core";
import { CustomTreeView } from "@/subframe/components/CustomTreeView";
import { IconButton } from "@/subframe/components/IconButton";
import { Avatar } from "@/subframe/components/Avatar";
import { Button } from "@/subframe/components/Button";

function CompanyDetails() {
  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-4 bg-neutral-50 px-6 py-12 overflow-auto">
        <div className="flex w-full min-w-[320px] flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm mobile:w-full mobile:grow mobile:shrink-0 mobile:basis-0">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                className="max-h-[40px] flex-none"
                src="https://res.cloudinary.com/subframe/image/upload/v1725459945/uploads/3896/wf18my0jclzl62ajsuts.webp"
              />
              <span className="text-heading-2 font-heading-2 text-default-font">
                Ethena Labs
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success">92</Badge>
              <img
                className="max-h-[40px] flex-none"
                src="https://res.cloudinary.com/subframe/image/upload/v1725473386/uploads/3896/icp6lu3j5pslb3zh27ik.webp"
              />
              <img
                className="max-h-[40px] flex-none"
                src="https://res.cloudinary.com/subframe/image/upload/v1725473397/uploads/3896/wmrrytylvu5nvalilhaq.webp"
              />
              <img
                className="max-h-[40px] flex-none"
                src="https://res.cloudinary.com/subframe/image/upload/v1725473427/uploads/3896/g7mpfbdn0lgtxx4xwvsx.webp"
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-start gap-2 px-1 py-1">
              <Badge>Blockchain</Badge>
              <Badge>Cryptocurrency</Badge>
              <Badge variant="neutral">Basis Trading</Badge>
            </div>
            <VerticalStepper />
            <div className="flex items-start gap-2 px-1 py-1 float-right">
              <Badge variant="success">Overall: 92</Badge>
              <Badge variant="success">Team: 90</Badge>
              <Badge variant="success">Investor: 95</Badge>
              <Badge variant="neutral">Growth: 80</Badge>
              <Badge>Unrated</Badge>
            </div>
          </div>
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
          <span className="text-body font-body text-default-font">
            Ethena provides derivative infrastructure in order to transform
            Ethereum into the first crypto-native yield bearing stablecoin.
          </span>
          <div className="flex w-full items-start gap-2 px-1 py-1">
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon
                  className="text-body font-body text-default-font"
                  name="FeatherBookOpen"
                />
                <span className="text-body font-body text-default-font">
                  Founded
                </span>
              </div>
              <span className="text-body font-body text-default-font">
                Jan 2023
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <span className="text-body font-body text-default-font">
                Stage
              </span>
              <span className="text-body font-body text-default-font">
                Seed
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon
                  className="text-body font-body text-default-font"
                  name="FeatherBanknote"
                />
                <span className="text-body font-body text-default-font">
                  Raised
                </span>
              </div>
              <span className="text-body font-body text-default-font">
                $20.5M
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon
                  className="text-body font-body text-default-font"
                  name="FeatherBanknote"
                />
                <span className="text-body font-body text-default-font">
                  TVL
                </span>
              </div>
              <span className="text-body font-body text-default-font">
                $2.7B
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <span className="text-body font-body text-default-font">
                Headcount
              </span>
              <span className="text-body font-body text-default-font">14</span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon
                  className="text-body font-body text-default-font"
                  name="FeatherTriangle"
                />
                <span className="text-body font-body text-default-font">
                  Headcount
                </span>
              </div>
              <span className="text-body font-body text-success-700">40%</span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon
                  className="text-body font-body text-default-font"
                  name="FeatherActivity"
                />
                <span className="text-body font-body text-default-font">
                  MAU
                </span>
              </div>
              <span className="text-body font-body text-default-font">
                326.2K
              </span>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
              <div className="flex items-center gap-2">
                <SubframeCore.Icon
                  className="text-body font-body text-default-font"
                  name="FeatherTriangle"
                />
                <span className="text-body font-body text-default-font">
                  MAU
                </span>
              </div>
              <span className="text-body font-body text-error-700">-11%</span>
            </div>
          </div>
          <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
          <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6">
            <CustomTreeView>
              <CustomTreeView.Folder label="Seed" value="$20.5M">
                <div className="flex w-full items-center justify-between">
                  <CustomTreeView.Item
                    className="h-auto w-auto flex-none"
                    label="Leads"
                    value=""
                  />
                  <div className="flex grow shrink-0 basis-0 flex-col items-end gap-2 px-1 py-1">
                    <div className="flex items-center gap-2">
                      <span className="text-heading-3 font-heading-3 text-success-700">
                        Dragonfly
                      </span>
                      <span className="text-body font-body text-default-font">
                        , BH Digital
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between">
                  <CustomTreeView.Item
                    className="h-auto w-auto flex-none"
                    label="Followers"
                    value=""
                  />
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex w-full items-center gap-1">
                      <span className="text-heading-3 font-heading-3 text-success-700">
                        Franklin Templeton,
                      </span>
                      <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 px-1 py-1">
                        <div className="flex w-full items-center gap-2">
                          <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-success-700">
                            Wintermute Ventures,
                          </span>
                          <span className="text-body font-body text-default-font">
                            OKX, Arthur Hayes,
                          </span>
                          <span className="text-body font-body text-default-font">
                            Bybit,{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="w-144 text-body font-body text-default-font">
                      Maelstrom, Deribit, Gemini, GSR, BitMEX, Binance Labs,
                      Avon Ventures, philip morris, Hashed, Galaxy Digital
                    </span>
                  </div>
                </div>
              </CustomTreeView.Folder>
            </CustomTreeView>
          </div>
        </div>
        <span className="text-heading-2 font-heading-2 text-default-font">
          Growth
        </span>
        <div className="flex w-full grow shrink-0 basis-0 flex-wrap items-start gap-6">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch">
            <div className="flex w-full grow shrink-0 basis-0 flex-wrap items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4">
                <div className="flex w-full flex-col items-start gap-4">
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    Headcount
                  </span>
                  <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                    <div className="flex h-52 w-full flex-none items-center gap-2">
                      <img
                        className="grow shrink-0 basis-0 self-stretch object-contain"
                        src="https://res.cloudinary.com/subframe/image/upload/v1725511131/uploads/3896/g7k3lq4s8ggjcriu5iow.png"
                      />
                    </div>
                  </div>
                </div>
                <span className="text-heading-3 font-heading-3 text-default-font">
                  Web Traffic
                </span>
                <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                  <div className="flex h-52 w-full flex-none items-center gap-2">
                    <img
                      className="grow shrink-0 basis-0 self-stretch object-contain"
                      src="https://res.cloudinary.com/subframe/image/upload/v1725510304/uploads/3896/bhcsy4vlwwetkq8fjh5e.png"
                    />
                  </div>
                </div>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4">
                <div className="flex w-full flex-col items-start gap-4">
                  <span className="text-heading-3 font-heading-3 text-default-font">
                    Trends
                  </span>
                  <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                    <div className="flex h-52 w-full flex-none items-center gap-2">
                      <img
                        className="grow shrink-0 basis-0 self-stretch object-contain"
                        src="https://res.cloudinary.com/subframe/image/upload/v1725509614/uploads/3896/cfk1kpxb8mytv94hqvej.png"
                      />
                    </div>
                  </div>
                </div>
                <span className="text-heading-3 font-heading-3 text-default-font">
                  TVL
                </span>
                <div className="flex w-full items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                  <img
                    className="h-52 grow shrink-0 basis-0 object-contain"
                    src="https://res.cloudinary.com/subframe/image/upload/v1725510668/uploads/3896/xvtrhvyt15eabntfxulv.png"
                  />
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default CompanyDetails;