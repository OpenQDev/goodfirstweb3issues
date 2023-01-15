import ChatBubbleLeftRightIcon from "../icons/ChatBubbleLeftRight";

export default function RepoCard(props: any) {
  return (
    <button className="w-full flex items-center">
      <span className="text-violet-300 mr-2">
        #{props.issue.number}
      </span>
      {props.issue.title}
      <span className="ml-auto opacity-50">
        <span className="mr-1 font-normal text-sm">{props.issue.number}</span>
        <ChatBubbleLeftRightIcon width="18" height="18" />
      </span>
    </button>
  );
}
