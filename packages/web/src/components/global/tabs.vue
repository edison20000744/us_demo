<template>
	<div :class="$style.tabs" :type="type">
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	type: typeof types[number],
	modelValue?: any,
}>();
</script>

<script lang="ts">
export default {
	name: 'UsTabs'
};

export const types = [
	'header',
	'home',
	'analysis-tg',
	'match-live',
	'tg',
	'tg-pc',
	'tg-mobile',
	"gamelist",
	'pc/date-picker/tabs',
	'pc/analysis-us/tabs',
	'pc/analysis-us2/tabs',
	'pc/db/menu-tabs',
	'pc/db/round-tabs',
	'pc/db/subpage-tabs',
	'pc/db/table-tabs',
	'pc/search/main-tabs',
	'mobile/footer/tabs',
	'mobile/analysis-tg/tabs',
	'mobile/search/tabs',
	"mobile/gamelist/tabs",
	"mobile/gamelist-date/tabs",
	'mobile/filter/tabs',
	'mobile/analysis/tabs',
	'mobile/analysis2/tabs',
	'mobile/db-league/season/tabs',
	'mobile/db-league/season-stats/tabs',
	'mobile/db-league/round/tabs',
	'mobile/db-league/tabs',
] as const;
</script>

<style lang="scss" module>
%flex-tabs {
	display: inline-flex;
	flex-wrap: nowrap;
	justify-content: space-between;

	[tab-pane] {
		cursor: pointer;
		user-select: none;
		text-decoration: none;

		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	>[disabled] {
		color: #bbb;
		pointer-events: none;
	}

	>hr {
		display: none;
	}
}

.tabs[type="header"] {
	@extend %flex-tabs;

	[tab-pane] {
		position: relative;
		font-size: 14px;
		line-height: 52px;
		letter-spacing: 0.7px;
		color: #909293;
		padding: 0 30px;

		&::before {
			content: "";
			position: absolute;
			transform: scaleX(0);
			left: 30px;
			right: 30px;
			bottom: 0;
			height: 3px;
			background: linear-gradient(-90deg, #ccb49a 0%, #b8956c 100%);
			transition: all 0.2s;
		}

		&:hover,
		&[active] {
			color: #bfa173;
			font-weight: 500;
		}

		&[active] {
			&::before {
				transform: scaleX(1);
			}
		}
	}
}

.tabs[type="mobile/footer/tabs"] {
	display: flex;
	justify-content: space-between;
	margin: 8px 0 0;
	padding: 11px 41px 8px 39px;

	[tab-pane] {
		display: inline-flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: column;
		font-size: 9px;
		text-align: center;
		color: #a0a0a0;

		&[active] {
			color: #4e549f;
		}
	}
}

.tabs[type="home"] {
	@extend %flex-tabs;

	background-color: #fefeff;
	border-radius: 6px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16);
	padding: 3px;
	margin-right: 20px;

	>*+* {
		margin-left: 8px;
	}

	[tab-pane] {
		position: relative;
		flex: initial;
		transition: all 0.2s;
		height: 26px;
		padding: 0 16px;
		color: #8a8c8d;
		fill: #8a8c8d;
		border-radius: 6px;

		&[active] {
			color: #ffffff;
			fill: #ffffff;
			background: linear-gradient(to bottom, #ffe7cb, #c08544 75%, #b47836);
			box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
			font-weight: 500;
		}
	}
}

.tabs[type="pc/date-picker/tabs"] {
	@extend [type="home"];
	padding: 5px;

	[tab-pane] {
		font-size: 14px;
		line-height: 26px;

		img {
			margin-right: 5px;
		}
	}

	&:first-child {
		padding-left: 10px;
	}

	&[active] {
		font-size: 12px;
	}
}

.tabs[type="pc/analysis-us/tabs"] {
	@extend %flex-tabs;

	display: inline-flex;
	align-items: center;
	justify-content: flex-start;
	width: max-content;

	[tab-pane] {
		position: relative;
		font-size: 14px;
		line-height: 44px;
		color: #555657;
		padding: 0 8px;

		&::before {
			content: "";
			position: absolute;
			transform: scaleX(0);
			margin: 0 8px;
			left: 0;
			right: 0;
			bottom: 0;
			height: 3px;
			background: linear-gradient(90deg,
					#ffe7cb 0%,
					#c08544 75.31%,
					#b47836 100%);
			transition: all 0.2s;
		}

		&:hover,
		&[active] {
			color: #a87a44;
			font-weight: 500;

			&::before {
				transform: scaleX(1);
			}
		}
	}

	>hr {
		margin: 0 8px;
		display: inline-block;
		height: 14px;
		width: 1px;
		background-color: #d5d6d7;
		border: none;
	}
}

.tabs[type="analysis-tg"] {
	@extend %flex-tabs;

	display: inline-flex;
	align-items: center;
	justify-content: flex-start;
	width: max-content;

	[tab-pane] {
		position: relative;
		font-size: 14px;
		line-height: 44px;
		color: #555657;
		padding: 0 8px;

		&::before {
			content: "";
			position: absolute;
			transform: scaleX(0);
			margin: 0 8px;
			left: 0;
			right: 0;
			bottom: 0;
			height: 3px;
			background: var(--tab-pane-bg-color1);
			transition: all 0.2s;
		}

		&:hover,
		&[active] {
			color: var(--tab-pane-fontColor-active);
			font-weight: 500;

			&::before {
				transform: scaleX(1);
			}
		}
	}

	>hr {
		margin: 0 8px;
		display: inline-block;
		height: 14px;
		width: 1px;
		background-color: #d5d6d7;
		border: none;
	}
}

.tabs[type="mobile/analysis-tg/tabs"] {
	@extend [type="analysis-tg"];

	[tab-pane] {
		min-width: mobile_number(222px);

		&::before {
			margin: 0;
		}

		&:not(:first-child)::after {
			content: "";
			display: block;
			position: absolute;
			left: 0;
			width: 1px;
			height: mobile_number(54px);
			background-color: #707070;
		}
	}
}

.tabs[type="pc/analysis-us2/tabs"] {
	@extend %flex-tabs;

	>*+* {
		margin-left: 12px;
	}

	[tab-pane] {
		display: inline-flex;
		justify-content: center;
		align-items: center;

		cursor: pointer;
		background-color: #ffffff;
		color: #555657;
		font-size: 12px;
		height: 24px;
		width: 80px;
		border-radius: 6px;
		border: 1px solid #d5d6d7;
		box-sizing: border-box;

		&[active] {
			color: #ffffff;
			border: none;
			box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
			background-image: linear-gradient(to bottom,
					#ffe7cb,
					#c08544 75%,
					#b47836);
		}
	}
}

.tabs[type="match-live"] {
	@extend %flex-tabs;
	align-items: center;
	justify-content: center;

	color: #ffffff;
	font-size: 12px;
	background-color: rgba($color: #171819, $alpha: 0.8);

	[tab-pane] {
		display: inline-flex;
		flex-direction: column;

		width: 136px;

		>*+* {
			margin-top: 8px;
		}

		&[active] {
			color: #5779ff; //#fdc3bd;

			// svg
			*[fill="#fff"] {
				fill: #5779ff; //#fdc3bd;
			}

			*[stroke="#fff"] {
				stroke: #5779ff; //#fdc3bd;
			}
		}
	}

	>[disabled] {
		opacity: 0.5;
	}

	>hr {
		display: inline-block;
		height: 39px;
		width: 1px;
		background-color: #d5d6d7;
		border: none;
		margin: 0;
	}
}

.tabs[type="tg"] {
	@extend %flex-tabs;

	width: 100%;

	>*+* {
		margin-left: mobile_number(70px);
	}

	[tab-pane] {
		width: 100%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 5px mobile_number(46px) 5px mobile_number(170px);
		min-height: mobile_number(133px);
		color: #909293;
		font-size: mobile_number(48px);
		border: 1px solid #d5d6d7;
		border-radius: mobile_number(28px);
		background: #ffffff;
		box-shadow: 0 0 mobile_number(15px) rgba($color: #000, $alpha: 0.1);
		box-sizing: border-box;
		font-weight: 700;
		position: relative;

		>*+* {
			margin-left: mobile_number(46px);
		}

		&::before {
			content: "";
			width: mobile_number(71px);
			height: mobile_number(71px);
			transition: all 0.2s;
			background-color: #fff;
			border-radius: 50%;
			border: 1px solid rgba($color: #707070, $alpha: mobile_number(1));
			box-sizing: border-box;
			margin-right: 6px;
			position: absolute;
			left: 15px;
		}
	}

	>[active] {
		border: none;
		background: var(--record-tab-pane-active);
		color: #fff;

		&::before {
			content: "";
			width: mobile_number(71px);
			height: mobile_number(71px);
			// background-color: var(--checkbox-bgColor);
			// background-image: url("./assets/checkmark.svg");
			background: url("./assets/checkmark.svg") no-repeat center /  mobile_number(35px) , var(--checkbox-bgColor) ;
			// background-repeat: no-repeat;
			// background-position: center center;
			// background-size: mobile_number(35px);
			border: rgba($color: #283763, $alpha: mobile_number(1)); //none;
		}
	}
}

.tabs[type="tg-pc"] {
	@extend %flex-tabs;

	width: 100%;

	line-height: mobile_number(131px);
	font-size: mobile_number(48px);
	color: #555657;

	>*+* {
		margin-left: mobile_number(20px);
	}

	[tab-pane] {
		border-radius: mobile_number(45px) mobile_number(45px) 0 0;
		flex: 1;
		background: var(--matchDetail-tab);
	}

	>[active] {
		color: var(--matchDetail-tab-active-fontColor);
		background: var(--matchDetail-tab-active);
	}
}

.tabs[type="tg-mobile"] {
	@extend %flex-tabs;

	width: 100%;

	line-height: mobile_number(131px);
	font-size: mobile_number(48px);
	color: #555657;

	>*+* {
		margin-left: mobile_number(20px);
	}

	[tab-pane] {
		border-radius: mobile_number(45px) mobile_number(45px) 0 0;
		flex: 1;
		background: var(--matchDetail-tab);
	}

	>[active] {
		background: var(--matchDetail-tab-active);
		color: var(--matchDetail-tab-active-fontColor);
	}
}

.tabs[type="gamelist"] {
	@extend %flex-tabs;

	display: inline-flex;
	align-items: center;
	justify-content: flex-start;
	width: max-content;

	[tab-pane] {
		position: relative;
		font-size: 14px;
		color: #555657;
		padding: 0 16px 8px 16px;

		&::before {
			content: "";
			position: absolute;
			transform: scaleX(0);
			// margin: 0 5px;
			left: 0;
			right: 0;
			bottom: 0;
			height: 4px;
			background-image: linear-gradient(to right,
					#ffe7cb,
					#c08544 75%,
					#b47836);
			transition: all 0.2s;
		}

		&:hover,
		&[active] {
			color: #a87a44;
			font-weight: 500;

			&::before {
				transform: scaleX(1);
			}
		}
	}

	>hr {
		margin: 0 8px;
		display: inline-block;
		height: 14px;
		width: 1px;
		background-color: #d5d6d7;
		border: none;
	}
}

.tabs[type="pc/db/menu-tabs"] {
	@extend %flex-tabs;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	font-size: 14px;
	font-weight: 500;
	line-height: 1.83;
	color: #a87a44;
	background-color: #fff;

	border-radius: 6px;
	background-color: #ffffff;
	box-shadow: 0 3px 6px rgba($color: #000000, $alpha: 0.16);

	[tab-pane] {
		display: flex;
		flex-direction: row;
		width: 100%;
		min-height: 36px;
		padding: 8px 0;

		>*+* {
			margin-top: 8px;
		}

		&[active] {
			background-color: rgba($color: #d1ae84, $alpha: 0.15);
		}
	}

	>[disabled] {
		opacity: 0.5;
	}
}

.tabs[type="pc/db/subpage-tabs"] {
	border-bottom: 1px solid #d5d6d7;
	padding: 0 16px;
	color: #555657;
	display: flex;

	hr {
		display: none;
	}

	[tab-pane] {
		display: inline-block;
		padding: 0 6px 3px 6px;
		line-height: 42px;
		height: 42px;
		font-size: 14px;
		user-select: none;
		cursor: pointer;
		white-space: nowrap;
		position: relative;
		box-sizing: border-box;

		&[active],
		&:hover:not([disabled]) {
			color: #b8956c;
			font-weight: 700;
		}

		&[active]::after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			display: block;
			height: 3px;
			background: linear-gradient(to right,
					#e9d2ba,
					#c89c69 48%,
					#b8956b 86%,
					#b8956c);
		}

		&[disabled] {
			pointer-events: none;
			opacity: 0.5;
		}
	}
}

.tabs[type="pc/db/round-tabs"] {
	hr {
		display: none;
	}

	[tab-pane] {
		line-height: 24px;
		margin: 6px;
		display: inline-block;
		min-width: 45px;
		padding: 0 2px;
		text-align: center;
		border-radius: 6px;
		font-size: 12px;
		cursor: pointer;
		user-select: none;
		background-color: #fff;
		border: 1px solid #d5d6d7;
		color: #909293;
		box-sizing: border-box;
		white-space: nowrap;
		overflow: hidden;
		// text-overflow: ellipsis;

		&[roundEnd] {
			background-color: #f0f1f2;
			border: none;
			color: #909293;
		}

		&[active] {
			color: #fff;
			background: #a87a44;
		}

		&[disabled] {
			pointer-events: none;
			opacity: 0.5;
		}
	}
}

.tabs[type="pc/db/table-tabs"] {
	padding: 6px 4px 2px 10px;
	border-bottom: 1px solid #d5d6d7;
	padding-bottom: 6px;

	hr {
		display: none;
	}

	[tab-pane] {
		display: inline-flex;
		align-items: center;
		font-size: 12px;
		color: #909293;
		border-radius: 6px;
		border: 1px solid #d5d6d7;
		padding: 0px 11px;
		margin: 6px;
		user-select: none;
		box-sizing: border-box;
		height: 24px;
		line-height: 24px;
		cursor: pointer;

		&[active] {
			background: linear-gradient(to bottom,
					#ffe7cb,
					#c08544 75%,
					#b47836);
			color: #fff;
			border: none;
			padding: 0px 12px;
		}

		&[disabled] {
			pointer-events: none;
			opacity: 0.5;
		}
	}
}

.tabs[type="pc/search/main-tabs"] {
	display: flex;
	justify-content: center;
	border-bottom: 1px solid #d5d6d7;

	hr {
		display: none;
	}

	[tab-pane] {
		display: inline-block;
		padding: 0 16px 0 16px;
		line-height: 36px;
		font-size: 14px;
		user-select: none;
		color: #555657;
		cursor: pointer;
		position: relative;

		&[active],
		&:hover:not([disabled]) {
			color: #a87a44;
			font-weight: 500;
		}

		&[active]::after {
			content: "";
			display: block;
			left: 0;
			right: 0;
			bottom: 0;
			height: 3px;
			background: linear-gradient(90deg,
					#ffe7cb 0%,
					#c08544 75.31%,
					#b47836 100%);
			position: absolute;
		}

		&[disabled] {
			pointer-events: none;
			opacity: 0.5;
		}
	}
}

.tabs[type="mobile/db-league/season/tabs"] {
	@extend %flex-tabs;

	display: inline-flex;
	align-items: center;
	justify-content: flex-start;
	width: max-content;

	[tab-pane] {
		position: relative;
		font-size: 13px;
		line-height: 1.46;
		color: #505155;
		padding: 0 8px;
		font-weight: 500;
		height: 32px;

		&::before {
			content: "";
			position: absolute;
			transform: scaleX(0);
			left: 50%;
			right: 0;
			bottom: 0;
			height: 3px;
			background: #737fc1;
			transition: all 0.2s;
			width: 20px;
		}

		&:hover,
		&[active] {
			color: #4e549f;
			font-weight: 500;

			&::before {
				transform: translateX(-50%) scaleX(1);
			}
		}
	}

	>hr {
		margin: 0 8px;
		display: inline-block;
		height: 14px;
		width: 1px;
		background-color: #d5d6d7;
		border: none;
	}
}

.tabs[type="mobile/db-league/season-stats/tabs"] {
	@extend [type="pc/analysis-us2/tabs"];
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	row-gap: 8px;
	column-gap: 8px;

	[tab-pane] {
		margin: 0;
		color: #505155;
		width: fit-content;
		padding: 4px 12px;
		border-radius: 4px;
		font-size: 11px;
		background: #f4f4f4;
		border: solid 1px #c7c7c7;

		&[active] {
			color: #4e549f;
			background: #d9ddf0;
			border: solid 1px #737fc1;
			box-shadow: none;
		}
	}
}

.tabs[type="mobile/gamelist/tabs"] {
	@extend %flex-tabs;
	display: flex;
	padding: 7px;

	[tab-pane] {
		flex: 1;
		padding: 6px 16px;
		margin: 0 8px 0 0;
		min-width: 39px;
		height: 19px;
		font-size: 13px;
		font-weight: 500;
		line-height: 1.46;
		text-align: center;
		color: #505155;

		&[active] {
			color: #ffffff;
			box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
			border-radius: 34px;
			background-image: linear-gradient(to bottom,
					#cfd2ed,
					#7d85c3 26%,
					#6971af 54%,
					#7d87c1 79%,
					#a2aee2 90%,
					#5c64a7 93%,
					#989aa5);
		}
	}
}

.tabs[type="mobile/analysis/tabs"] {
	@extend [type="mobile/gamelist/tabs"];
	width: max-content;

	[tab-pane] {
		flex: none;
	}
}

.tabs[type="mobile/gamelist-date/tabs"] {
	@extend %flex-tabs;
	padding: 3px;
	margin-right: 20px;

	>*+* {
		margin-left: 8px;
	}

	[tab-pane] {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transition: all 0.2s;
		min-width: 56px;
		min-height: 40px;
		padding: 4px 12px;
		fill: #505050;
		color: #505050;
		border-radius: 6px;

		&[active] {
			object-fit: contain;
			border: solid 1px #737fc1;
			background-color: #d9ddf0;
		}
	}
}

.tabs[type="mobile/filter/tabs"] {
	@extend %flex-tabs;
	border-radius: 6px;
	background-image: linear-gradient(to bottom,
			#fff,
			#e6e6e6 11%,
			#fff 88%,
			#d3d3d3 94%,
			#f4f4f4);

	[tab-pane] {
		border-right: solid 1px #cdcdd6;

		&:first-child {
			border-radius: 6px 0px 0px 6px;
		}

		&:last-child {
			border-radius: 0px 6px 6px 0px;
		}

		position: relative;
		flex: initial;
		transition: all 0.2s;
		padding: 7px 16px;
		font-size: 13px;
		font-weight: 500;
		line-height: 1.46;
		color: #505155;
		fill: #505155;

		&[active] {
			fill: #fff;
			color: #fff;
			background-image: linear-gradient(to bottom,
					#cfd2ed,
					#7d85c3 26%,
					#6971af 54%,
					#7d87c1 79%,
					#a2aee2 90%,
					#5c64a7 93%,
					#989aa5);
		}
	}
}

.tabs[type="mobile/analysis2/tabs"] {
	@extend %flex-tabs;

	width: 100%;

	font-size: 12px;
	font-weight: 500;
	line-height: 1.5;
	color: #505155;

	[tab-pane] {
		// min-width: mobile_number(222px);
		flex: 1;
		position: relative;

		&::before {
			margin: 0;
		}

		&:not(:first-child)::after {
			content: "";
			display: block;
			position: absolute;
			left: 0;
			width: 1px;
			height: mobile_number(54px);
			background-color: #707070;
		}

		&[active] {
			color: #4e549f;
		}
	}
}

.tabs[type="mobile/db-league/tabs"] {
	@extend %flex-tabs;
	width: max-content;
	display: flex;

	>*+* {
		margin-left: 8px;
	}

	[tab-pane] {
		min-width: 50px;
		text-align: center;
		transition: all 0.2s;
		padding: 7px 16px 6px 17px;
		object-fit: contain;
		border-radius: 4px;
		background-color: #fdfdfd;
		font-size: 13px;
		font-weight: 500;
		line-height: 1.46;
		text-align: center;
		color: #505155;

		&[active] {
			object-fit: contain;
			background-color: #737fc1;
			color: #fff;
		}
	}
}

.tabs[type="mobile/db-league/round/tabs"] {
	@extend %flex-tabs;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(5, 1fr);

	[tab-pane] {
		width: 100%;
		height: 24px;
		overflow: hidden;
		display: inline-block;
		text-overflow: ellipsis;
		text-align: center;
		white-space: nowrap;
		object-fit: contain;
		background: url("./assets/com_round_Num_defaule_bg.svg") no-repeat,
			linear-gradient(to left,
				rgba(214, 216, 232, 0.27) 103%,
				rgba(255, 255, 255, 0.56) 0%);

		background-size: cover;

		font-size: 11px;
		line-height: 1.91;
		color: #4e549f;

		&[roundEnd] {
			background-image: linear-gradient(to left, rgba(173, 175, 190, 0.27) 103%, rgba(173, 175, 190, 0.05) 0%);
			line-height: 1.73;
			color: #c7c7c7;
		}

		&[active] {
			background: url(./assets/com_round_Num_active_bg.svg);
			background-size: cover;
			color: #fff;
			line-height: 1.91;
			color: #fff;
		}

		>[disabled] {
			background: url("./assets/com_round_Num_disable_bg.svg") no-repeat,
				linear-gradient(to left,
					rgba(214, 216, 232, 0.27) 103%,
					rgba(255, 255, 255, 0.56) 0%);
			background-size: cover;
			font-size: 11px;
			line-height: 1.73;
			color: #c7c7c7;
		}
	}
}

.tabs[type="mobile/search/tabs"] {
	@extend [type="mobile/db-league/season/tabs"];
	width: 100%;
	justify-content: space-around;
}
</style>
