import React from 'react';
import { Button } from 'antd';

type SocialButtonProps = {
  imgSrc?: string;
  svgIcon?: JSX.Element;
  altText: string;
  buttonText: string;
};

const SocialButton: React.FC<SocialButtonProps> = ({ imgSrc, svgIcon, altText, buttonText }) => {
  return (
    <Button
      className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
      block
    >
      <div className="relative flex items-center space-x-4 justify-center">
        {imgSrc && (
          <img
            src={imgSrc}
            className="absolute left-0 w-5"
            alt={altText}
          />
        )}
        {svgIcon && (
          <div className="absolute left-0 w-5 text-gray-700">
            {svgIcon}
          </div>
        )}
        <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
          {buttonText}
        </span>
      </div>
    </Button>
  );
};

export default SocialButton;
