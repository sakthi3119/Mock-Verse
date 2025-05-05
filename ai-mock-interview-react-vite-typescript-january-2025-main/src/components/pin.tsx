import { Interview } from "@/types";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tooltip-button";
import { Eye, Newspaper, Sparkles } from "lucide-react";

interface InterviewPinProps {
  interview: Interview;
  onMockPage?: boolean;
}

export const InterviewPin = ({
  interview,
  onMockPage = false,
}: InterviewPinProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-5 rounded-2xl bg-gradient-to-br from-[#232e47cc] via-[#2c5364cc] to-[#ff6e7fcc] shadow-lg border border-white/10 backdrop-blur-sm transition-all duration-200 cursor-pointer hover:scale-[1.03] hover:shadow-2xl hover:border-pink-300/30 hover:bg-gradient-to-br hover:from-[#232e47ee] hover:to-[#ff6e7fee] space-y-4">
      <CardTitle className="text-lg text-white font-bold drop-shadow-sm">{interview?.position}</CardTitle>
      <CardDescription className="text-white/90 font-medium drop-shadow-sm">{interview?.description}</CardDescription>
      <div className="w-full flex items-center gap-2 flex-wrap">
        {interview?.techStack.split(",").map((word, index) => (
          <Badge
            key={index}
            variant={"outline"}
            className="text-xs font-semibold text-[#232e47] bg-white/90 border-white/80 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-900 shadow"
          >
            {word}
          </Badge>
        ))}
      </div>

      <CardFooter
        className={cn(
          "w-full flex items-center p-0",
          onMockPage ? "justify-end" : "justify-between"
        )}
      >
        <p className="text-[12px] text-white/80 truncate whitespace-nowrap font-medium">
          {`${new Date(interview?.createdAt.toDate()).toLocaleDateString(
            "en-US",
            { dateStyle: "long" }
          )} - ${new Date(interview?.createdAt.toDate()).toLocaleTimeString(
            "en-US",
            { timeStyle: "short" }
          )}`}
        </p>

        {!onMockPage && (
          <div className="flex items-center justify-center">
            <TooltipButton
              content="View"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/generate/${interview?.id}`, { replace: true });
              }}
              disbaled={false}
              buttonClassName="hover:text-sky-500"
              icon={<Eye />}
              loading={false}
            />

            <TooltipButton
              content="Feedback"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/generate/feedback/${interview?.id}`, {
                  replace: true,
                });
              }}
              disbaled={false}
              buttonClassName="hover:text-yellow-500"
              icon={<Newspaper className="text-white drop-shadow-sm" />}
              loading={false}
            />

            <TooltipButton
              content="Start"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/generate/interview/${interview?.id}`, {
                  replace: true,
                });
              }}
              disbaled={false}
              buttonClassName="hover:text-yellow-300 text-white"
              icon={<Sparkles className="text-white drop-shadow-sm" />}
              loading={false}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};