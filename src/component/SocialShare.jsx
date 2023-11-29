import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share';

export function SocialShare({ shareUrl, title }) {
  return (
    <div className='flex gap-3 items-center mt-5 max-w-screen-md mx-auto'>
      <div className='text-slate-500 font-medium text-2xl'>Share to:</div>
      <div className='text-center'>
        <FacebookShareButton
          url={shareUrl}
          className='flex justify-center whitespace-no-wrap overflow-visible w-8 text-base'
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>

      <div className='text-center'>
        <TwitterShareButton
          url={shareUrl}
          title={title}
          className='flex justify-center whitespace-no-wrap overflow-visible w-8 text-base'
        >
          <XIcon size={32} round />
        </TwitterShareButton>
      </div>

      <div className='text-center'>
        <TelegramShareButton
          url={shareUrl}
          title={title}
          className='flex justify-center whitespace-no-wrap overflow-visible w-8 text-base'
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </div>

      <div className='text-center'>
        <WhatsappShareButton
          url={shareUrl}
          title={title}
          separator=':: '
          className='flex justify-center whitespace-no-wrap overflow-visible w-8 text-base'
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

      <div className='text-center'>
        <LinkedinShareButton
          url={shareUrl}
          className='flex justify-center whitespace-no-wrap overflow-visible w-8 text-base'
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>

      <div className='text-center'>
        <EmailShareButton
          url={shareUrl}
          subject={title}
          // body={`${title}`}
          className='flex justify-center whitespace-no-wrap overflow-visible w-8 text-base'
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </div>
  );
}
