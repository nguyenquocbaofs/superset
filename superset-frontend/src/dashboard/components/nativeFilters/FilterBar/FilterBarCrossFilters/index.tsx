/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import {
  FilterBarOrientation,
  DashboardInfo,
  DashboardLayout,
  RootState,
} from 'src/dashboard/types';
import { DataMaskStateWithId } from '@superset-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { updateDataMask } from 'src/dataMask/actions';
import FilterBarCrossFiltersVertical from './Vertical';
import crossFiltersSelector from './selectors';

const FilterBarCrossFilters = (props: {
  orientation: FilterBarOrientation;
}) => {
  const { orientation } = props;
  const dispatch = useDispatch();
  const dataMask = useSelector<RootState, DataMaskStateWithId>(
    state => state.dataMask,
  );
  const dashboardInfo = useSelector<RootState, DashboardInfo>(
    state => state.dashboardInfo,
  );
  const dashboardLayout = useSelector<RootState, DashboardLayout>(
    state => state.dashboardLayout.present,
  );
  const selectedCrossFilters = crossFiltersSelector({
    dataMask,
    dashboardInfo,
    dashboardLayout,
  });

  const handleRemoveCrossFilter = (chartId: number) => {
    dispatch(
      updateDataMask(chartId, {
        extraFormData: {
          filters: [],
        },
        filterState: {
          value: null,
          selectedValues: null,
        },
      }),
    );
  };

  if (!selectedCrossFilters.length) return null;

  return (
    <FilterBarCrossFiltersVertical
      crossFilters={selectedCrossFilters}
      removeCrossFilter={handleRemoveCrossFilter}
      orientation={orientation}
    />
  );
};

export default FilterBarCrossFilters;
