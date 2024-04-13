import { FaRegFileCode } from "react-icons/fa";
import { LiaLanguageSolid } from "react-icons/lia";
import { MdEmojiFlags, MdOutlineEmojiSymbols } from "react-icons/md";
import { PiCurrencyRubDuotone, PiTrainRegionalThin } from "react-icons/pi";
import { RxLetterCaseCapitalize } from "react-icons/rx";
import { SiCodepen, SiNamecheap, SiNativescript } from "react-icons/si";
import { Tb24Hours } from "react-icons/tb";

export const TypeOfImage = ["png", "jpg", "jpeg", "jfif", "jpeg"];

export const CountrylogoDetails = [
  <Tb24Hours className="text-xl rounded text-white" />,
  <SiNamecheap className="text-xl rounded text-green-500" />,
  <SiNativescript className="text-xl rounded text-red-500" />,
  <SiCodepen className="text-xl rounded text-white" />,
  <FaRegFileCode className="text-xl rounded text-green-500" />,
  <PiTrainRegionalThin className="text-xl rounded text-red-500" />,
  <RxLetterCaseCapitalize className="text-xl rounded text-white" />,
  <PiCurrencyRubDuotone className="text-xl rounded text-green-500" />,
  <LiaLanguageSolid className="text-xl rounded text-red-500" />,
  <MdEmojiFlags className="text-xl rounded text-white" />,
  <MdOutlineEmojiSymbols className="text-xl rounded text-white" />,
];
